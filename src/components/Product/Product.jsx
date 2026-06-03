import './Product.css'

function Product({ image, name, price, onAddToCart, inStock = true, tag = null }) {
    return (
        <article className="product-card">
            {tag ? <span className="product-card__tag">{tag}</span> : null}
            <img className="product-card__image" src={image} alt={name} />
            <h3 className="product-card__name">{name}</h3>
            <p className="product-card__price">{price}</p>
            <button 
                className={`product-card__button ${!inStock ? 'product-card__button--disabled' : ''}`} 
                type="button" 
                onClick={onAddToCart}
                disabled={!inStock}
            >
                {inStock ? 'AÑADIR AL CARRITO' : 'SIN STOCK'}
            </button>
        </article>
    )
}

export default Product