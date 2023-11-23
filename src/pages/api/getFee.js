export default async (req, res) => {
  try {
    console.log(req.body)
    var buf = Buffer.from(req.body.external, 'base64').toString('utf-8')
    console.log(buf,'buf')
    const response = await fetch(`${process.env.BASE_API_URL}/ClubServices/api/ServiceClub/GetVisaFee?quoteNo=${req.body.quoteNo}&externalUserId=${buf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request content type,
        'Ocp-Apim-Subscription-Key':'835e396d470544c7838d7f083698808b'
      }
    });
    const data = await response.json();
    console.log(data.data,'data')
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};