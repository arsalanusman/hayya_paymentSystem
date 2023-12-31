export default async (req, res) => {
  try {
    let request = {
      "transactionId": req.body.transactionId,
      "externalPartyId": req.body.externalPartyId,
      "vendorCode": req.body.vendorCode
    }

    const response = await fetch(`${process.env.BASE_API_URL}/api/Services/transaction-success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request content type
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