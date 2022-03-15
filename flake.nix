{
  description = "expose as a flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-21.11";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
      };
      nixified =
        pkgs.stdenv.mkDerivation {
          name = "ignite-editor-nix";

          # Manually declare output so that we have internet access to pull node
          # modules. Nix people hate this btw, since it isn't pure- but guess
          # what it's convenient and removes a moving piece.
          outputHashMode = "recursive";
          outputHashAlgo = "sha256";
          outputHash = "sha256-+kb01O7zUkccivwtxAGyKJgB0/qK/BYzKxkxWA2Fzkg=";
          # Use source
          src = self;
          # We need unzip to build this package
          buildInputs = [ pkgs.nodePackages.node2nix ];
          buildPhase = ''
            node2nix --development --strip-optional-dependencies --bypass-cache -l package-lock.json
          '';
          # Installing simply means copying all files to the output directory
          installPhase = ''# Build source files and copy them over.
            mkdir -p $out/
            cp *.json $out/
            # lol and but not the flake file since the hash would have to be
            # dependent on itself.
            cp default.nix $out/
            cp node-env.nix $out/
            cp node-packages.nix $out/
        '';
        };
      shell = #node2nix
        (pkgs.callPackage nixified { }).shell;

      nodeDependencies = shell.nodeDependencies;
    in
    {
      defaultPackage."${system}" =
        pkgs.stdenv.mkDerivation {
          name = "ignite-editor";
          # Use source
          src = self;
          # We need unzip to build this package
          buildInputs = [ pkgs.nodejs ];
          buildPhase = ''
            ln -s ${nodeDependencies}/lib/node_modules ./node_modules
            export PATH="${nodeDependencies}/bin:$PATH"
            npm run build;
          '';
          # Installing simply means copying all files to the output directory
          installPhase = ''# Build source files and copy them over.
          mkdir -p $out;
          cp src/*.json $out/
          cp src/*.png $out/
          cp -R dist $out/static;
          ln -s $out/static/index.html $out/;
          ln -s $out/static/frame.html $out/;
        '';
        };
    };
}
