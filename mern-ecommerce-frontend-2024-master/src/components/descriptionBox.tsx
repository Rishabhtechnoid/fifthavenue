
import "./descriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
        <div className='descriptionBox-navigator'>
            <div className='descriptionBox-nav-box'>Description</div>
            <div className='descriptionBox-nav-box fade'>Reviews</div>
        </div>
        <div className='descriptionBox-description'>
            <p>Fabric: Constructed with a durable cotton lycra blend, offering a perfect balance of comfort and flexibility for your active lifestyle.
Rise and Fit: Enjoy a high-rise design coupled with a slim fit, providing ample room for movement and functionality.
Wash Care: Machine wash cold separately, tumble dry low, iron on low heat if necessary, do not bleach, and do not dry clean.</p>
<p>Best Fit: To ensure the ideal fit, please consult the size chart displayed in the image.
Proudly Made in India: Each Jeans piece is proudly manufactured in India, reflecting our commitment to local production and craftsmanship excellence.</p>
        </div>
    </div>
  )
}

export default DescriptionBox