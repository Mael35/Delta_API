export default function Products(props) {
    
    const productsElements = props.data.map(i => <div 
        key={i.id} 
        className={i.cost === 500 ? 
            'products__item products__item--500' 
            : 
            'products__item'}
    >
        <img src={props.validateUrl(props.url) ? props.url : ""} alt="Aperçu du produit"/>
        <h3 className='products__subtitle'>Produit: {i.name}</h3>
        <p style={{fontSize: "14px"}} >Description : {i.description} </p> {/* inline style example, style is assigned a JS object */}
        <p>Prix: {i.cost} </p>
        
        <button 
            className={i.cost === 500 ? 
                "products__deleteButton products__deleteButton--500" 
                : 
                "products__deleteButton"} 
            onClick={event => props.deleteProduct(event, i.id)} /* we need a callback to pass a parameter to our event handler */
        >Delete</button>
    </div>)

    return (
        <div className="products">
            <h2 className='products__title'>Produits disponibles</h2>

            <div className='products__container'>
                {productsElements}
            </div>
        </div>
    )
}