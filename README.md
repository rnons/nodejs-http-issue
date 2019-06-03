# A nodejs http or stream module issue

When sending some json string to a nodejs http server, the request body on the server side is somehow different from what I sent.

## How to reproduce

1. start a http server that writes the request body to `node_req.json`.
    ```
    node server.js
    ```
2. send a local file `data.json` to the server
    ```
    curl -d @data.json http://localhost:3050
    ```
3. compare `data.json` with `node_req.json`
    ```
    diff data.json node_req.json
    ```

Expecting `diff` to return status code 0, which means `data.json` is equivalent to `node_req.json`. But `diff` actually returns status code 1.

As a comparison, I made another http server in python. Run

```
python3 server.py
curl -d @data.json http://localhost:3060
diff data.json py_req.json
```

and diff returns 0.

## the different part

```
js-beautify data.json -o data_beautified.json
js-beautify node_req.json -o node_req_beautified.json
diff data_beautified.json node_req_beautified.json
```

gives this output

```
1083c1083
<         ["¥state¤None¦screen¥Large¤name¨lg:-m-10", "¥value§-2.5rem¨property¦margin¨disabledÂ"],
---
>         ["¥state¤None¦screen¥Large¤name¨lg:-m-10", "¥value§-2.5rem¨property��margin¨disabledÂ"],
2130c2130
<         ["¥state¤None¦screen¥Large¤name¯lg:inline-block", "¥value¬inline-block¨property§display¨disabledÂ"],
---
>         ["¥state¤None¦screen¥Large¤name��lg:inline-block", "¥value¬inline-block¨property§display¨disabledÂ"],
6869c6869
<         ["¥state¤None¦screen¥Large¤name´xl:align-text-bottom", "¥value«text-bottom¨property®vertical-align¨disabledÂ"],
---
>         ["¥state¤None¦screen¥Large¤name´xl:align-text-bottom", "��value«text-bottom¨property®vertical-align¨disabledÂ"],

```
