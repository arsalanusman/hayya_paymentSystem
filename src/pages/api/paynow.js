export default async (req, res) => {
  try {
    let serviceId = ''
    if(req.query.type == 'telecom'){
      serviceId = '5046540E-0AFC-4D73-9699-69269643BF27'
    }else if(req.query.type == 'moi'){
      serviceId = 'DD6E76F2-346A-4889-AC14-1176A673EF9C'
    }
    
    let request = {
      "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "hayyaTransactionId": "A23CD074-C9D0-431A-A29D-5286D782E8DC",
      "amount": req.body.amount,
      "quoteNo": req.body.quote.quoteNo,
      "promoCode": null,
      "serviceDetials": {
        "serviceId": serviceId,
        "clientSubServiceId": req.body.clientSubServiceId
      },
      "paymentRequest": {
        "amount": req.body.amount,
        "currency": "USD",
        "transactionId": "A23CD074-C9D0-431A-A29D-5286D782E8DC",
        "locale": "string",
        "address": "string",
        "country": "string",
        "name": "John",
        "email": "john@dev.com",
        "success_url": "string",
        "failure_url": "string",
        "cancel_url": "string",
        "lastName": "doe"
      }
    }

    console.log(serviceId,'serviceId')

    const response = await fetch(`${process.env.BASE_API_URL}/api/Services/PayNow`, {
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