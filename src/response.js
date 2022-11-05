const SendResponse = {
    badRequest: (h, message) => {
        return h.response({
            status: "fail",
            message: message,
        }).code(400)
    },
    internalError: (h, message) => {
        return h.response({
            status: "error",
            message: message,
        }).code(500)
    },
    created: (h, message, data) => {
        return h.response({
            status: "success",
            message: message,
            data,
        }).code(201)
    },
    success: (h, data) => {
        return h.response({
            status: "success",
            data,
        }).code(200)
    },
    notFound: (h, message) => {
        return h.response({
            status: "fail",
            message,
        }).code(404)
    }
}

export default SendResponse;