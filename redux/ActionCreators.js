import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, comment) => (dispatch) => {
  const newComment = {
    dish: dishId,
    rating: rating,
    comment: comment,
  };

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      alert("post comments", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const postFavorite = (dishId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(dishId));
  }, 2000);
};

export const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId,
});

export const deleteFavorite = (dishId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId,
});

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
    id: response.id,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else if (!response.ok) {
          alert("ERROR:" + " " + "Failed to load response!");
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        AsyncStorage.setItem("token", response.token);
        AsyncStorage.setItem("creds", JSON.stringify(creds));
        AsyncStorage.setItem("id", response.id);

        dispatch(receiveLogin(response));
        alert("Login Successful:" + " " + "Welcome " + creds.username);
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("creds");

  dispatch(receiveLogout());
  alert("Logout Successful ");
};

export const fetchEtf = () => (dispatch) => {
  dispatch(etfLoading());

  return fetch(baseUrl + "etf")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((etf) => dispatch(addEtf(etf)))
    .catch((error) => dispatch(etfFailed(error.message)));
};

export const etfLoading = () => ({
  type: ActionTypes.ETF_LOADING,
});

export const etfFailed = (errmess) => ({
  type: ActionTypes.ETF_FAILED,
  payload: errmess,
});

export const addEtf = (etf) => ({
  type: ActionTypes.ADD_ETF,
  payload: etf,
});

export const addEtfSale = (stock) => ({
  type: ActionTypes.ADD_STOCK,
  payload: stock,
});

export const postEtfSale = (value) => (dispatch) => {
  const newSale = {
    category: "Exchange Traded Fund",
    value: value,
  };

  const bearer = AsyncStorage.getItem("token");

  return fetch(baseUrl + "stock/buy", {
    method: "POST",
    body: JSON.stringify(newSale),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((stock) => {
      dispatch(addEtfSale(stock));
      alert("Your Request Is Being Processed! ");
    })
    .catch((error) => {
      alert("Your purchase could not be posted\nError: " + error.message);
    });
};

export const fetchNdf = () => (dispatch) => {
  dispatch(ndfLoading());

  return fetch(baseUrl + "ndf")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((ndf) => dispatch(addNdf(ndf)))
    .catch((error) => dispatch(ndfFailed(error.message)));
};

export const ndfLoading = () => ({
  type: ActionTypes.NDF_LOADING,
});

export const ndfFailed = (errmess) => ({
  type: ActionTypes.NDF_FAILED,
  payload: errmess,
});

export const addNdf = (ndf) => ({
  type: ActionTypes.ADD_NDF,
  payload: ndf,
});

export const addNdfSale = (stock) => ({
  type: ActionTypes.ADD_STOCK,
  payload: stock,
});

export const postNdfSale = (value) => (dispatch) => {
  const newSale = {
    category: "Nova Dollar Fund",
    value: value,
  };

  const bearer = "Bearer " + AsyncStorage.getItem("token");

  return fetch(baseUrl + "stock/buy", {
    method: "POST",
    body: JSON.stringify(newSale),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((stock) => {
      dispatch(addNdfSale(stock));
      alert("Your Request Is Being Processed! ");
    })
    .catch((error) => {
      alert("Your purchase could not be posted\nError: " + error.message);
    });
};

export const fetchNmmf = () => (dispatch) => {
  dispatch(nmmfLoading());

  return fetch(baseUrl + "nmmf")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((nmmf) => dispatch(addNmmf(nmmf)))
    .catch((error) => dispatch(nmmfFailed(error.message)));
};

export const nmmfLoading = () => ({
  type: ActionTypes.NMMF_LOADING,
});

export const nmmfFailed = (errmess) => ({
  type: ActionTypes.NMMF_FAILED,
  payload: errmess,
});

export const addNmmf = (nmmf) => ({
  type: ActionTypes.ADD_NMMF,
  payload: nmmf,
});

export const addNmmfSale = (stock) => ({
  type: ActionTypes.ADD_STOCK,
  payload: stock,
});

export const postNmmfSale = (value) => (dispatch) => {
  const newSale = {
    category: "Nova Money Market Fund",
    value: value,
  };

  const bearer = "Bearer " + AsyncStorage.getItem("token");

  return fetch(baseUrl + "stock/buy", {
    method: "POST",
    body: JSON.stringify(newSale),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((stock) => {
      dispatch(addNmmfSale(stock));
      alert("Your Request Is Being Processed! ");
    })
    .catch((error) => {
      alert("Your purchase could not be posted\nError: " + error.message);
    });
};

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback,
});

export const postFeedback = (values) => (dispatch) => {
  const newFeedback = {
    firstname: values.firstname,
    lastname: values.lastname,
    telnum: values.telnum,
    email: values.email,
    bvnnum: values.bvnnum,
    address: values.address,
  };

  return fetch(baseUrl + "feedback", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(addFeedback(response));
      alert("Registration Successful! Allow 24hrs for feedback.");
    })
    .catch((error) =>
      alert("Your registration could not be posted\nError: " + error.message)
    );
};

export const fetchUser = () => (dispatch) => {
  dispatch(userLoading());

  return fetch(baseUrl + "users/5f1d245ce1bd492204f54fb1")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((user) => dispatch(addUser(user)))
    .catch((error) => dispatch(userFailed(error.message)));
};

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING,
});

export const userFailed = (errmess) => ({
  type: ActionTypes.USER_FAILED,
  payload: errmess,
});

export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const historyLoading = () => ({
  type: ActionTypes.HISTORY_LOADING,
});

export const historyFailed = (errmess) => ({
  type: ActionTypes.HISTORY_FAILED,
  payload: errmess,
});

export const addHistory = (user) => ({
  type: ActionTypes.ADD_HISTORY,
  payload: user,
});
