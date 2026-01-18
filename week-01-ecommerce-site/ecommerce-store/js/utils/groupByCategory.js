function groupByCategory(products)
{
    return products.reduce((accumulator , product) => {
        if(!accumulator[product.category])
        {
            accumulator[product.category] = [];
        }

        accumulator[product.category].push(product);
        return accumulator;
    } , {});
}   