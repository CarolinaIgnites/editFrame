                  ▄▄▄▄
                 ██▀▀▀
      ▄████▄   ███████    ██▄████   ▄█████▄  ████▄██▄   ▄████▄
     ██▄▄▄▄██    ██       ██▀       ▀ ▄▄▄██  ██ ██ ██  ██▄▄▄▄██
     ██▀▀▀▀▀▀    ██       ██       ▄██▀▀▀██  ██ ██ ██  ██▀▀▀▀▀▀
     ▀██▄▄▄▄█    ██       ██       ██▄▄▄███  ██ ██ ██  ▀██▄▄▄▄█
       ▀▀▀▀▀     ▀▀       ▀▀        ▀▀▀▀ ▀▀  ▀▀ ▀▀ ▀▀    ▀▀▀▀▀

---

# About

editFrame is an editor for [gameFrame](https://github.com/CarolinaIgnites/gameFrame), with the idea of making the environment to develop a basic game as simple as possible. The project was developed for Highschool out reach at RidgeView Highscool, as part of the University of South Carolina, Google IgniteCS program. The results of this program can be found at [www.carolinaignites.org](https://www.carolinaignites.org)

**Note:** Editframe is under active development and likely to change. [See a live verison here](https://editor.carolinaignites.org)

### A screenshot of the editor

![Here's the editor in action.](images/screen.png)

# Starting out

Clone the repo

Install node modules
 `npm install`

Launch the dev server:
 `npm run dev`

Boot it up. Try it out. Share [ridiculously long links encoding games](https://editor.carolinaignites.org/#eyJtZXRhIjp7Im5hbWUiOiJDaGVmIG9yIERpZSIsImluc3RydWN0aW9ucyI6IkNvbGxlY3QgdGhlIGZydWl0cyBhdm9pZCB0aGUga25pdmVzLiBEb24ndCBmYWxsIG9mZiB0aGUgZWRnZS4gVXNlIGFycm93IGtleXMgdG8gbW92ZS4gWW91IGNhbnQganVtcCAoRHVoKS4iLCJib3VuZGFyaWVzIjpmYWxzZSwiZ3Jhdml0eSI6dHJ1ZSwiaW1wdWxzZSI6dHJ1ZSwiZGVidWciOnRydWV9LCJodG1sIjoiUEhOMlp5QnBaRDBpWjJGdFpTSWdhVzFuUFdoMGRIQTZMeTloYXpNdWNHbGpaRzR1Ym1WMEwzTm9kWFIwWlhKemRHOWpheTkyYVdSbGIzTXZNVFV3TVRFeU1ETXZkR2gxYldJdk1TNXFjR2MrQ2lBZ0lDQThjbVZqZENCamJHRnpjejBpWW1GemEyVjBJRzF2ZG1GaWJHVWlJR2x0WnowaWFIUjBjSE02THk5c2FETXVaMjl2WjJ4bGRYTmxjbU52Ym5SbGJuUXVZMjl0TDBSRVpqSkViRGRwYm5BNE5XRmhlV2cwYmtsVVgwb3hkRzFpUldock5HODBVbW96UkZWV1dEVmFhVGxWVlU5M1MxVTNPRVEyVDNWQ2NXSk9PVnBrUTB0NlRXbE5QWE14TWpnaUlHbGtQU0p3YkdGNVpYSWlJSGRwWkhSb1BTSXhPREFpSUdobGFXZG9kRDBpTmpBaUlIazlOekE0SUhnOU5qZ3pQaUE4TDNKbFkzUStDaUFnSUNBOGNtVmpkQ0JqYkdGemN6MGlZbTkxYm1RZ2MzUmhkR2xqSWlCM2FXUjBhRDBpTVRNMk5pSWdhR1ZwWjJoMFBTSTFNQ0lnZUQwMk9ETWdlVDAzTmpnK0lEd3ZjbVZqZEQ0S1BDOXpkbWMrQ2dvOGMzWm5JR2xrUFNKMFpXMXdiR0YwWlhNaVBnb0pQSEpsWTNRZ1kyeGhjM005SW1KaGJtRnVZU0JtY25WcGRDQmtjbTl3Y0dGaWJHVWlJR2x0WnowaWFIUjBjSE02THk5c2FETXVaMjl2WjJ4bGRYTmxjbU52Ym5SbGJuUXVZMjl0TDI1M1NrTmhWVzlyTTNWRFQyOWFTRzlUTUhwRU9IaEJMWE4wUVVkVGJGVjFNRVl5UmpkT1pYVmxSMmQ2VWt4SVYxQmZRbWgzTjFrd1pqQXRZamR4T1hsTGFITmlQWE00TlNJZ2QybGtkR2c5SWpJd0lpQm9aV2xuYUhROUlqVXdJajQ4TDNKbFkzUStDaUFnSUNBOFkybHlZMnhsSUdOc1lYTnpQU0poY0hCc1pTQm1jblZwZENCa2NtOXdjR0ZpYkdVaUlHbHRaejBpYUhSMGNITTZMeTlzYURNdVoyOXZaMnhsZFhObGNtTnZiblJsYm5RdVkyOXRMMU5wUVZWNmNFdFBabDlLTVVKeU5XSXdVemxqYTBWVU9HcDFWRUZTWldObU5WRnhUVGhHVEdOak5rbzJPVWd4UWxCeFFqZE1YekF6VTBkNFZXWnRObmhaTlU1cmFuTkJQWE14TURnaUlISTlJakl3SWo0OEwyTnBjbU5zWlQ0S0lDQWdJRHh5WldOMElHTnNZWE56UFNKcmJtbG1aU0JrY205d2NHRmliR1VpSUdsdFp6MGlhSFIwY0hNNkx5OXNhRE11WjI5dloyeGxkWE5sY21OdmJuUmxiblF1WTI5dEwxUlRNSFo1UWtsU1RUTk1Wak5wTTE5MWRFSkRPWFJHYkdoZmNuQTVjamxVY20xMVZIUnpaVXBUVkZKaFFrWjZaRmRsTUVJM05qRjVaa1JTY21Fd1psaGpkbVZ3UFhNNE5TSWdkMmxrZEdnOUlqSXdJaUJvWldsbmFIUTlJalV3SWo0OEwzSmxZM1ErQ2p3dmMzWm5QZz09IiwiY29kZSI6IlkyOXNiR2x6YVc5dUtDSXVhMjVwWm1VaUxDQWlJM0JzWVhsbGNpSXNJR1oxYm1OMGFXOXVLR1JoZEdFc0lHeHZiMnQxY0NrZ2V3b2dJQ0FnWjJGdFpVOTJaWElvS1RzS2ZTa0tZMjlzYkdsemFXOXVLQ0l1Wm5KMWFYUWlMQ0FpSTNCc1lYbGxjaUlzSUdaMWJtTjBhVzl1S0dSaGRHRXNJR3h2YjJ0MWNDa2dld29nSUNBZ2MyTnZjbVVvTVRBd0tUc0tJQ0FnSUhKbGJXOTJaU2hrWVhSaFd5Y3VabkoxYVhRblhTazdDbjBwQ25KbFoybHpkR1Z5UzJWNWN5Z2lJM0JzWVhsbGNpSXNJSHNLSUNBZ0lDZHNaV1owSnpvZ1puVnVZM1JwYjI0b2NHeGhlV1Z5TENCc2IyOXJkWEFwSUhzS0lDQWdJQ0FnSUNCd2JHRjVaWEl1YzNSaGRHVXVjRzl6TG5nZ0xUMGdNakE3Q2lBZ0lDQjlMQW9nSUNBZ0ozSnBaMmgwSnpvZ1puVnVZM1JwYjI0b2NHeGhlV1Z5TENCc2IyOXJkWEFwSUhzS0lDQWdJQ0FnSUNCd2JHRjVaWEl1YzNSaGRHVXVjRzl6TG5nZ0t6MGdNakE3Q2lBZ0lDQjlMQW9nSUNBZ0ozVndKem9nWm5WdVkzUnBiMjRvY0d4aGVXVnlMQ0JzYjI5cmRYQXBJSHNLSUNBZ0lDQWdJQ0J3YkdGNVpYSXVjM1JoZEdVdWRtVnNMbmtnUFNBdE1DNDFPd29nSUNBZ2ZTd0tJQ0FnSUNkamJHbGpheWM2SUdaMWJtTjBhVzl1S0hCc1lYbGxjaXdnYkc5dmEzVndMQ0JrWVhSaEtTQjdDaUFnSUNBZ0lDQWdiR1YwSUdSNElEMGdLR1JoZEdFdWVDQXRJSEJzWVhsbGNpNXpkR0YwWlM1d2IzTXVlQ2s3Q2lBZ0lDQWdJQ0FnYkdWMElHUjVJRDBnS0dSaGRHRXVlU0F0SUhCc1lYbGxjaTV6ZEdGMFpTNXdiM011ZVNrN0NpQWdJQ0FnSUNBZ2JHVjBJRzV2Y20wZ1BTQXlNQ0FxSUUxaGRHZ3VjM0Z5ZENoa2VDQXFJR1I0SUNzZ1pIa2dLaUJrZVNrN0NpQWdJQ0FnSUNBZ2NHeGhlV1Z5TG5OMFlYUmxMbkJ2Y3k1NUlDczlJR1I1SUM4Z2JtOXliVHNLSUNBZ0lDQWdJQ0J3YkdGNVpYSXVjM1JoZEdVdWNHOXpMbmdnS3owZ1pIZ2dMeUJ1YjNKdE93b2dJQ0FnZlN3S2ZTa0tiR1YwSUhRZ1BTQXdPd3BzWlhRZ2JXRjRYMnR1YVhabGN5QTlJRGM3Q214bGRDQnBiblJsY25aaGJDQTlJRFl3T3dwc1pYUWdaSEp2Y0hCaFlteGxjeUE5SUZzaUxtdHVhV1psSWl3Z0lpNWhjSEJzWlNJc0lDSXVZbUZ1WVc1aElsMDdDbkpsWjJsemRHVnlURzl2Y0hNb1puVnVZM1JwYjI0b2JHOXZhM1Z3S1NCN0NpQWdJQ0JzYjI5cmRYQmJJaU53YkdGNVpYSWlYUzV6ZEdGMFpTNTJaV3d1ZUNBOUlEQTdDaUFnSUNCcFppQW9kQ0FsSUdsdWRHVnlkbUZzSUQwOUlEQXBJSHNLSUNBZ0lDQWdJQ0JzWlhRZ1pISnZjSEJoWW14bElEMGdaSEp2Y0hCaFlteGxjMXROWVhSb0xuSmhibVJ2YlNncElDb2daSEp2Y0hCaFlteGxjeTVzWlc1bmRHZ2dmQ0F3WFRzS0lDQWdJQ0FnSUNCMFpXMXdiR0YwWlNoa2NtOXdjR0ZpYkdVc0lERXdJQ3NnTVRNMU5pQXFJRTFoZEdndWNtRnVaRzl0S0Nrc0lDMDFNQ2s3Q2lBZ0lDQjlDaUFnSUNCcFppQW9JaTVyYm1sbVpTSWdhVzRnYkc5dmEzVndJQ1ltSUcxaGVGOXJibWwyWlhNZ1BEMGdiRzl2YTNWd1d5SXVhMjVwWm1VaVhTNXphWHBsS1NCN0NpQWdJQ0FnSUNBZ2NtVnRiM1psS0VGeWNtRjVMbVp5YjIwb2JHOXZhM1Z3V3lJdWEyNXBabVVpWFNsYk1GMHBPd29nSUNBZ2ZRb2dJQ0FnZENBclBTQXhPd3A5S1RzPSJ9).

# Using Nix

We use Nix to stay sane and make sure that our servers are provisioned correctly.  To work in a nix-like environment. Install Nix and perform `nix develop .` and perform the commands above. To emulate a build for production, do `nix build .`.
