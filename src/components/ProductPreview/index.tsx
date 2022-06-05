import { useRef, useState } from "react";
import { Tabs, Image, Carousel, Button } from "antd";
import { ProducPreviewProps } from "../../types/dataTypes";

import addImageIcon from "../../assests/add-image-black.svg";
import "../ProductPreview/style.css";
import { fileToDataUri } from "../../helpers/helper";

const { TabPane } = Tabs;

const ProducPreview = (props : ProducPreviewProps ) =>{
    //console.log(props.thumbnail);

    const [activeTab,setActiveTab] = useState("1");
    const [images,setImages] = useState([] as string[]);
    const inputRef = useRef<HTMLInputElement>(null);

    const clickAddImage = () =>{
        inputRef.current?.click();
    }

    const uploadFile = (e:any) =>{
        const file = e.target.files[0];
        if(!file) {
            return;
        }
      
        fileToDataUri(file)
            .then(dataUri => {
                if(images.length < 4){
                    const image = dataUri as string;
                    setImages(images => [...images, image])
                }
            })
    }

    const handleTab = (key:string) => {
        console.log(key);
        setActiveTab(key);
    }

    return (
        <div className="gallery-panel">
            <Tabs activeKey={activeTab} centered onTabClick={(key)=>handleTab(key)}>

                <TabPane tab="Image Gallery" key="1" className="image-gallery-pane">
                    <div className="image-gallery" onClick={(props.thumbnail || images.length) ? ()=>{} : clickAddImage}>
                        {
                            props.thumbnail && <Image className="image-item" src={props.thumbnail}/>
                        }
                        {
                            images.length > 0 && images.map((item,index)=><Image className="image-item"  key={index} src={item}/>)
                        }
                        <span className="preview-icon" style={(props.thumbnail || images.length) ? {display:"none"} : {display:"flex"} }>
                            <img src={addImageIcon} className="add-image-preview"/>
                            <span style={{ fontFamily:"Helvetica Neue"}} className="pt-1 text-xs lg:text-base">Add Images</span>
                        </span>
                    </div>
                    <input type="file" ref={inputRef} onChange={(e)=>uploadFile(e)} accept="image/png, image/jpeg,image/jpg" hidden/>
                </TabPane>

                <TabPane tab="Preview" key="2" className="image-gallery-pane">
                      <div className="preview-gallery">
                        <Carousel autoplay>
                            { props.thumbnail && <div><Image className="contentStyle" src={props.thumbnail}/></div>}
                            {images.map((item,index)=><div key={index}><Image className="contentStyle" key={index} src={item}/></div>)}
                        </Carousel>
                      </div>
                </TabPane>
                
            </Tabs>
            <div className="upload-hint">
                { (props.thumbnail || images.length > 0) && <Button className="upload-btn ant-btn-primary" onClick={clickAddImage}>Add Image</Button>}
                <span>
                    You may upload up to 5 images (including thumbnail)
                </span>
                <span>
                    Supported file type: jpeg,jpg,png
                </span>
            </div>
        </div>
    );
}

export default ProducPreview;