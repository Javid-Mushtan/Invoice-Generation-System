import { templates } from '../assets/assets.js';

const TemplateGrid = ({onTemplateClick}) => {
    return (
        <div className="row g-3">
            {templates.map(({id, label,image}) => (
                <div className="col-12 col-sm-6 col-lg-4" key={id}>
                    <div className="border rounded shadow-sm overflow-hidden cursor-pointer" title={label}
                    onClick={(id) => onTemplateClick(id)}>
                        <img className="w-100" src={image} alt={label} loading="lazy" />
                        <div className="p-2 text-center fw-medium">
                            {label}
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default TemplateGrid;