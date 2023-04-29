# mock-8


```http
POST /api/register
```

## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. User Name |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |
| `address` | `object` | **Required**. User Address |

## Address Schema

| Parameter | Type | 
| :--- | :--- |
| `street` | `string` |
| `city` | `string` |
| `state` | `string` |
| `country` | `object` |
| `zip` | `string` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `User Registerd Sucessfully` |
| 400 | `Name, Email, Password or Address not provided` |
| 409 | `User Already Registered` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
POST /api/login
```
## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `User Login Sucessfully` |
| 400 | `Email or Password not provided` |
| 401 | `Wrong Credentials - Password does not match` |
| 501 | `INTERNAL SERVER ERROR` |


###

```http
PATCH /api/user/:id/reset
```
## Request Params

| Parameter | Description |
| :--- | :--- |
| `id` | User ID |

## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `old_password` | `string` | **Required**. Old Password |
| `new_password` | `string` | **Required**. New Password |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 204 | `Password Changed Sucesssfully` |
| 400 | `Old or New Password not provided` |
| 401 | `Old Password does not match` |
| 404 | `User Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
GET /api/restaurants
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `All Restaurants Data` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 

```javascript
[{
  _id: ObjectId,
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [{
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String
  }]
}]
```

###

```http
GET /api/restaurants/:id
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Restaurant ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `Restaurant Data` |
| 404 | `Restaurant Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 

```javascript
{
  _id: ObjectId,
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [{
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String
  }]
}


```

###

```http
GET /api/restaurants/:id/menu
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Restaurant ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `Restaurant Menu Data` |
| 404 | `Restaurant Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 

```javascript
[{
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String
}]
```

###

```http
POST /api/restaurants/:id/menu
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Restaurant ID` |

## Request Body 

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. Item Name |
| `description` | `string` | **Required**. Item Description |
| `price` | `number` | **Required**. Item Price |
| `image` | `string` | **Required**. Item Image Link |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `Item Added to Menu` |
| 404 | `Restaurant Not Found` |
| 501 | `INTERNAL SERVER ERROR` |


```http
DELETE /api/restaurants/:res-id/menu/:item-id
```

## Params

| Parameter | Description |
| :--- | :--- |
| `res-id` | `Restaurant ID` |
| `item-id` | `Menu Item ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 202 | `Menu Item Removed Sucessfully` |
| 404 | `Restaurant Not Found`|
| 404 | `Menu Item Not Found`|
| 501 | `INTERNAL SERVER ERROR` |

###

```http
POST /api/orders/
```

## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `restaurant_id` | `string` | Restaurant ID |
| `cart` | `[Object]` | Cart Array |

## Cart Schema

| Parameter | Type | 
| :--- | :--- |
| `item_id` | Menu Item ID |
| `quantity` | Menu Item Quantity |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `Order Placed Successfully` |
| 400 | `Restaurant_id or cart not provided in body` |
| 401 | `Login Required` |
| 404 | `Restaurant Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
GET /api/orders/:id
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Order ID` |


## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `Order Data` |
| 404 | `Order Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 


```javascript
{
	 _id: ObjectId,
	 user : { type: ObjectId, ref: 'User' },
	 restaurant : { type: ObjectId, ref: 'Restaurant' },
   items: [{
     name: String,
     price: Number,
     quantity: Number
   }],
   totalPrice: Number,
   deliveryAddress: {
     street: String,
     city: String,
     state: String,
     country: String,
     zip: String
   },
   status: String // e.g, "placed", "preparing", "on the way", "delivered"
}
```

###

```http
PATCH /api/orders/:id
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Order ID` |

## Request Body


| Parameter | Description |
| :--- | :--- |
| `status` | `New Status` |


## Status Codes

| Status Code | Description |
| :--- | :--- |
| 204 | `Order Staus Updated` |
| 404 | `Order Not Found` |
| 400 | `Order Status Required` |
| 501 | `INTERNAL SERVER ERROR` |
