

export const CreateUser = async (userNumber) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: userNumber,
      firstName: userNumber,
      lastName: "ipmo",
      realmType: "IPMO",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://idmservices.dev.ainqaplatform.in/create_keycloack_user",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

export const getAccessToken = async (username, pass) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "user_client");
  urlencoded.append("username", username);
  urlencoded.append("password", pass);
  urlencoded.append("grant_type", "password");
  urlencoded.append("client_secret", process.env.REACT_APP_ADMIN);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    // redirect: "follow",
  };

  let _ = await fetch(process.env.REACT_APP_DUMMYCLOAK, requestOptions);
  return _;
};
