module.exports = async function () {
    this.before('CREATE', 'files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/files(${req.data.ID})/content`
    })

    this.before('READ', 'files', req => {
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    })
}
