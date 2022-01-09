{
  description = "expose as a flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-21.11";

    node2nix = {
      url = "github:svanderburg/node2nix";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, node2nix }:
    let

      nixified =
        with import nixpkgs { system = "x86_64-linux"; };
        stdenv.mkDerivation {
          name = "ignite-editor-nix";
          outputHashMode = "recursive";
          outputHashAlgo = "sha256";
          outputHash = "sha256-AYk9Gjgdb2mLY1iLAHBEDw06JyyFWSPyQgMa/59+1PE=";
          # Use source
          src = self;
          # We need unzip to build this package
          buildInputs = [ pkgs.nodePackages.node2nix ];
          buildPhase = ''
            node2nix --development
          '';
          # Installing simply means copying all files to the output directory
          installPhase = ''# Build source files and copy them over.
            mkdir -p $out/
            cp src/*.json $out/
            cp src/*.png $out/
            cp *.json $out/
            cp *.nix $out/
        '';
        };

      nodeDependencies = #node2nix
        with import nixpkgs { system = "x86_64-linux"; };
        (pkgs.callPackage nixified { }).shell.nodeDependencies;
    in
    {
      defaultPackage.x86_64-linux =
        # Notice the reference to nixpkgs here.
        with import nixpkgs { system = "x86_64-linux"; };
        stdenv.mkDerivation {
          name = "ignite-editor";
          # Use source
          src = self;
          # We need unzip to build this package
          buildInputs = [ pkgs.nodejs pkgs.nodePackages.node2nix ];
          buildPhase = ''
            ln -s ${nodeDependencies}/lib/node_modules ./node_modules
            export PATH="${nodeDependencies}/bin:$PATH"
            npm run build;
          '';
          # Installing simply means copying all files to the output directory
          installPhase = ''# Build source files and copy them over.
          mkdir -p $out;
          cp -R dist $out/static;
          ln -s $out/static/index.html $out/;
          ln -s $out/static/frame.html $out/;
        '';
        };
    };
}
