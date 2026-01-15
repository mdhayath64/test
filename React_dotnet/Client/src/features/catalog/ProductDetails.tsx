import { useParams } from "react-router-dom";
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketApi";
import { useEffect, useState, type ChangeEvent, type ChangeEventHandler } from "react";


export default function ProductDetails() {
  const {id} = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const {data: basket} = useFetchBasketQuery();
  const item = basket?.items.find(x => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item])

  const {data: product, isLoading} = useFetchProductDetailsQuery(id ? parseInt(id): 0);

  if (isLoading || !product) return <div>Loading.......</div>

  const handelUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({product, quantity: updatedQuantity})
    } else {
      removeBasketItem({productId: product.id, quantity: updatedQuantity})
    }
  }

  const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    if (value >= 0) setQuantity(value)
  }

  const productDetails = [
    {lable: 'Name', Value: product.name},
    {lable: 'Description', Value: product.description},
    {lable: 'Type', Value: product.type},
    {lable: 'Brand', Value: product.brand},
    {lable: 'Quantity in stock', Value: product.quantityInStock},
  ]

  return (
    <Grid2 container spacing={6} maxWidth='lg' sx={{mx: 'auto'}}>
      <Grid2 size={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{mb:2}} />
        <Typography variant="h4" color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{
            '& td': {fontSize: '1rem'}
          }}>
            <TableBody>
              {productDetails.map((details, index) => (
                <TableRow key={index}>
                  <TableCell sx={{fontWeight: 'bold'}}>{details.lable}</TableCell>
                  <TableCell >{details.Value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField 
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              value={quantity}
              onChange={handelInputChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button 
              onClick={handelUpdateBasket}
              disabled={quantity === item?.quantity || !item && quantity === 0}
              sx={{height: '55px'}}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              >
                {item ? 'Update Quantity' : 'Add to Basket'}
              </Button>
          </Grid2>
        </Grid2>
      </Grid2>

    </Grid2>
  )
}