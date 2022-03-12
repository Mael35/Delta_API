export default function NewProduct(props) {

    // the inputs are controled by the state in App.js

    return (
        <div className="newProduct__form">
            <h3 className="newProduct__title" >Add a product</h3>
            <div className="newProduct__container">
                <label>Nom du produit : {" "} </label>
                <input
                    className="newProduct__input" 
                    type="text"
                    placeholder="Give me a name..." 
                    name="name"
                    value={props.newProduct.name}
                    onChange={props.handleChange} 
                />
            </div>
            
            <div className="newProduct__container">
                <label>Prix du produit : {" "}</label>
                <input 
                    className="newProduct__input"
                    type="number" 
                    name="cost" 
                    value={props.newProduct.cost}
                    onChange={props.handleChange} 
                /> 
            </div>
            
            <textarea
                className="newProduct__description"
                placeholder="Description du produit" 
                name="description"
                value={props.newProduct.description}
                onChange={props.handleChange} 
            />

            {props.inputInvalid && <p>{props.inputInvalid}</p>}

            <button className="newProduct__submitButton" onClick={props.submitProduct}>New product</button>
        </div>
    )
}

