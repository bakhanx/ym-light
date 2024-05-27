"use server"

export const getUploadURL = async () => {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_API_KEY}`,
        },
      },
    );
    const data = response.json();
    console.log(data);
    return data;
  };
  