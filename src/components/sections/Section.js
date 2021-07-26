import { useDrag } from "react-dnd";
const Section = ({ section, index, onDropSection, sectionType }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: sectionType,
        item: {
            type: sectionType,
            index: index
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(monitor);
            if (item && dropResult) {
                onDropSection(item);
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    return (
        <li key={index} className="list-group-item my-1 p-2" ref={dragRef}>
            <div className="card-hoc mt-2">
                <div className="headerLesson row p-2">
                    <div className="col-md-1">
                        <div className="iconLesson">
                            <img
                                className='rounded-circle'
                                src={section.photoUrl || "../../../image/welcome.jpg"}
                                alt="Lesson"
                                width="60"
                                height="60"
                            ></img>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="contentLesson">
                            <form className='form-group'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <p className='form-control'>{section.sectionName}</p>
                                        <p className='form-control mt-2'>{section.description}</p>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-end align-items-center">
                        <i className="fa fa-remove text-danger"></i>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default Section;