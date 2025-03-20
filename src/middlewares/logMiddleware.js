export const logMiddleware = async (req, res, next) => {
    settingLogRequest(req)
    settingLogResponse(req, res)
    next()
}

function settingLogRequest(req) {
    // use a proper logging library here
    console.debug({
        'url': req.url,
        'method': req.method,
        'bodyRequest': req.body,
        // 'headers': req.headers,
    });
}

function settingLogResponse(req, res) {
    const copyJSON = res.json
    let responseBody
    res.json = (jsonBody) => {
        res.json = copyJSON
        responseBody = jsonBody
        return res.json(jsonBody)
    };
    const copyEnd = res.end;
    res.end = (args) => {
        res.end = copyEnd
        // use a proper logging library here
        console.debug({
            'url': req.url,
            'method': req.method,
            'bodyRequest': req.body,
            'statusCode': res.statusCode,
            'bodyResponse': responseBody,
        });
        return res.end(args)
    };
}
