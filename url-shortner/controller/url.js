const nanoid = require('nanoid');
const Url = require('../model/urlmodel.js');

async function generateShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ msg: "Provide a URL" });
    }

    const existingUrl = await Url.findOne({ RedirectUrl: body.url });

    if (existingUrl) {
        const shortIdVal = nanoid.nanoid(8);
        await Url.updateOne(
            { RedirectUrl: body.url },
            { $set: { ShortId: shortIdVal, visited: [] } }
        );

        const allUrls = await Url.find({});
        return res.render("home", {
            id: shortIdVal,
            urls: allUrls,
        });
    }

    const shortIdVal = nanoid.nanoid(8);
    await Url.create({
        ShortId: shortIdVal,
        RedirectUrl: body.url,
        visited: [],
    });

    const allUrls = await Url.find({});
    return res.render("home", {
        id: shortIdVal,
        urls: allUrls,
    });
}

async function handleRedirect(req,res) {
    const shortId = req.params.shortId;

    try {
        const urlRecord = await Url.findOne({ ShortId: shortId });

        if (!urlRecord) {
            return res.status(404).json({ msg: 'URL not found' });
        }

        // Perform any analytics 
        urlRecord.clicks++;
        await urlRecord.save();


        return res.redirect(urlRecord.RedirectUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}


module.exports = {
  generateShortUrl,
  handleRedirect,
};
