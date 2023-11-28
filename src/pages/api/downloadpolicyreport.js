export default async (req, res) => {
  try {
    // Make the request to the external service to get the PDF data
    var buf = Buffer.from(req.body.external, 'base64').toString('utf-8')
    const response = await fetch(`${process.env.BASE_API_URL}/api/Client/GetPolicyPdfForUser?hshUserid=${req.body.transactionId}&quoteNo=${req.body.QuoteNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'835e396d470544c7838d7f083698808b',
        "ExternalUserId":buf
      },
    });
    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
