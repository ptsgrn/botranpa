export default async function ordering() {
  let menu = "";
  return {
    fulfillmentMessages: [
      {
        text: {
          text: ["Text response from webhook"],
        },
      },
      {
        line: {},
      },
    ],
  };
}
