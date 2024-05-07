module.exports = async function () {

    let{complains, comment}= this.entities;

    this.before('CREATE', 'files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/files(${req.data.ID})/content`
    })

    this.before('READ', 'files', req => {
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    })

    this.on('submitcomplaints',async (req)=>{
        debugger
        let result = req.data.data;
        result = JSON.parse(result);

        let call = req.data.status;
        call = JSON.parse(call);
        call = call.status;

        if (call == 'postComp') {
            await INSERT.into(complains).entries(result)
            return
        }
        if (call == 'postComm'){
            await INSERT.into(comment).entries(result)
            return
        }
        if (call == 'getComp') {
            var comp = result.complainno;
            let content = await SELECT.from(complains).where({complainno: comp});
            return JSON.stringify(content)

        }
        if(call == 'patchComp') {
            debugger
            var comp = result.complainno;
            let content = await UPDATE(complains).set({ cstatus: result.cstatus, cdesc: result.cdesc }).where({ complainno: comp });
            return
        }
        if(call == 'patchComp1') {
            debugger
            var comp = result.complainno;
            let content = await UPDATE(complains).set({ cstatus: result.cstatus}).where({ complainno: comp });
            return
        }
        if(call == 'getallComp'){
            let content = await SELECT.from(complains)
            return JSON.stringify(content)
        }
        if(call == 'patchDays'){
            debugger
            var comp = result.complainno;
            let content = await UPDATE(complains).set({ days: result.days}).where({ complainno: comp });
            return
        }
        if (call == 'getComments') {
            var comp = result.complainno;
            let content = await SELECT.from(comment).where({complainno: comp});
            return JSON.stringify(content)

        }
    })
}
