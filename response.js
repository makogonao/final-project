'use strict'

exports.status = (status, values, res) => {

    const data = {
        "values": values
    }

    res.status(status)
    res.json(data)
    res.end()

}