export default async (req, res) => {
  try {
    let request = {
      "transactionId": req.body.transactionId,
      "externalPartyId": req.body.externalPartyId,
      "vendorCode": req.body.vendorCode
    }

    const response = await fetch(`${process.env.BASE_API_URL}/ClubServices/api/ServiceClub/transaction-success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request content type
          "Ocp-Apim-Subscription-Key":"835e396d470544c7838d7f083698808b"
        },
        body: JSON.stringify(request), // Convert the request object to JSON
      });

      const data = await response.json();
      res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};