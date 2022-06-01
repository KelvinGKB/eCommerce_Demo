
import { useRef, useState } from "react";
import { Form, Input, Button, Radio, Tag, Checkbox, InputNumber, Row, Col } from 'antd';
import TextArea from "antd/lib/input/TextArea";

import { AddProductFormProps } from "../../types/dataTypes";
import ProducPreview from "../ProductPreview";

import "../AddProductForm/style.css";
import addImageIcon from "../../assests/add-image.svg";

type labelProps = {
    text:String
}

const LabelWithAsterisk:React.FunctionComponent<labelProps> = (props:labelProps)=> {
    return(
        <>
            {props.text}
            <span className="text-red-600 ml-1">*</span>
        </>
    );
}

const AddProductForm = (props : AddProductFormProps ) =>{

    const inputRef = useRef<HTMLInputElement>(null);
    const [clearThumbnailBtn,setClearThumbnailBtn] = useState(false);
    const [product,setProduct] = useState({
        name : "",
        category:"tshirts",
        thumbnailImage : "",
        image:[],
        brand:[] as string[],
        description:"",
        quantity:0,
        condition:"new",
        season:"",
        retail:0,
        isDeclarationCheck:false
    });

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
        console.log(product);
      };
    
    const onReset = () => {
        setProduct({
            name : "",
            category:"tshirts",
            thumbnailImage : "",
            brand:[] as string[],
            image:[],
            quantity:0,
            description:"",
            condition:"new",
            season:"",
            retail:0,
            isDeclarationCheck:false,
        });
    };

    const removeBrand = (value:string)=>{
        if(product.brand.length !== 0){
            product.brand = product.brand.filter(function(item) {
                return item !== value
            });

            return({
                ...product
            })
        }
    }

    const clickAddImage = () =>{
        inputRef.current?.click();
    }

    const fileToDataUri = (file:any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target?.result)
        };
        reader.readAsDataURL(file);
    })
    

    const uploadFile = (e:any) =>{
        const file = e.target.files[0];
        if(!file) {
            return;
        }
      
        fileToDataUri(file)
            .then(dataUri => {
                product.thumbnailImage = dataUri as string;
                setClearThumbnailBtn(true);
                return({
                    ...product
                })
            })
    }

    return (
        <Row className="add-product-panel">
            <Row className="title"><span>Add a Product</span></Row>
            <Col className='appColumn'><ProducPreview thumbnail={product.thumbnailImage}/></Col>
            <Col className='appColumn'>
                <div className="product-panel">
                    <Form
                    layout={"vertical"}
                    form={form}
                    onFinish={onFinish}
                    >
                        <Form.Item label={<LabelWithAsterisk text="Product Name"/>} className="field-required">
                            <Input placeholder="Name your listing. Keep it short and sweet" onPressEnter={(e)=>setProduct((product) =>{
                                product.name = e.currentTarget.value;
                                return({
                                    ...product
                                })
                            })}/>
                        </Form.Item>

                        <div className="product-column xl:flex lg:block">
                            <Form.Item  className="xl:w-3/4 lg:w-full" label={<LabelWithAsterisk text="Category"/>}>
                                <Radio.Group defaultValue={product.category}>
                                    <Radio.Button className="ant-radio-btn-category" value="collections">Collections</Radio.Button>
                                    <Radio.Button className="ant-radio-btn-category" value="accessories">Accessories</Radio.Button>
                                    <Radio.Button className="ant-radio-btn-category" value="tshirts">T-Shirts</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item className="xl:w-1/4 lg:w-full lg:block" label={<LabelWithAsterisk text="Thumbnail Image" />} style={{display:"none"}}>
                                {
                                    product.thumbnailImage === "" &&                         
                                    <Button type="primary" className="btn-primary-icon" onClick={clickAddImage} style={product.thumbnailImage === "" ? {display:"block"} : {display:"none"}}>
                                        <img src={addImageIcon} className="w-4 h-4"/>
                                        <span className="ml-1">Add Image</span>
                                    </Button>
                                }
                                {
                                    product.thumbnailImage !=="" &&                         
                                    <Button type="primary" className="btn-primary-icon" onClick={()=>{
                                        product.thumbnailImage = "";
                                        setClearThumbnailBtn(false);
                                        return({
                                            ...product
                                        })}}
                                        style={product.thumbnailImage === "" ? {display:"block"} : {display:"none"}}
                                        >
                                        Clear Image
                                    </Button>
                                } 
                            </Form.Item>
                            <input type="file" ref={inputRef} onChange={(e)=>uploadFile(e)} accept="image/png, image/jpeg,image/jpg" hidden/>
                        </div>

                        <Form.Item
                            label={<LabelWithAsterisk text="Brand (up to 2)"/>}
                            help={
                            <>
                                {
                                    product.brand.length === 0 &&
                                    <div className="brand-helper-text">
                                        <span className="mr-2">E.g.</span>
                                            <Tag closable>Popmart</Tag>
                                            <Tag closable>Kaws </Tag>
                                    </div>
                                }
                                {
                                    product.brand.length !== 0 &&
                                    <div className="brand-helper-text">
                                        {
                                            product.brand.map((item,index)=><Tag key={index} closable onClose={()=>removeBrand(item)}>{item}</Tag>)
                                        }
                                    </div>
                                }
                            </>
                            }
                        >
                            <Input placeholder="Add a keyword and press Enter" onPressEnter={(e)=>setProduct((product) =>{
                                if(product.brand.length < 2){
                                    product.brand.push(e.currentTarget.value);
                                    e.currentTarget.value = "";
                                    return({
                                        ...product
                                    })
                                }else{
                                    return({
                                        ...product
                                    })
                                }
                            })}/>
                        </Form.Item>

                        <Form.Item label={<LabelWithAsterisk text="Description"/>}>
                            <TextArea placeholder="Add more information about the product" value={product.description} showCount maxLength={200} style={{ height: 40 }} onChange={(e)=>setProduct((product) =>{
                                product.description = e.currentTarget.value;
                                return({
                                    ...product
                                })
                            })}/>
                        </Form.Item>

                        <div className="flex items-start justify-between">
                            <Form.Item label={<LabelWithAsterisk text="Available Qty"/>} className="w-5/12 lg:w-1/2">
                                <InputNumber placeholder="Enter available quantity" style={{ width:"100%" }} 
                                    min={0}
                                    formatter={value => `${value}`}
                                    onChange={(value)=>setProduct((product) =>{
                                        product.quantity = value as number;
                                        return({
                                            ...product
                                    })
                                })}/>
                            </Form.Item>
                            <Form.Item className="w-5/12 lg:hidden" label={<LabelWithAsterisk text="Thumbnail Image"/>}>
                                    {
                                        product.thumbnailImage === "" &&                         
                                        <Button type="primary" className="btn-primary-icon" onClick={clickAddImage} style={product.thumbnailImage === "" ? {display:"block"} : {display:"none"}}>
                                            <img src={addImageIcon} className="w-4 h-4"/>
                                            <span className="ml-1">Add Image</span>
                                        </Button>
                                    }
                                    {
                                        product.thumbnailImage !=="" &&                         
                                        <Button type="primary" className="btn-primary-icon" onClick={()=>{
                                            product.thumbnailImage = "";
                                            setClearThumbnailBtn(false);
                                            return({
                                                ...product
                                            })}}
                                            style={product.thumbnailImage === "" ? {display:"block"} : {display:"none"}}
                                            >
                                            Clear Image
                                        </Button>
                                    } 
                            </Form.Item>
                        </div>

                        <Form.Item label="Condition">
                            <Radio.Group defaultValue={product.condition}>
                                <Radio.Button value="bad">Bad</Radio.Button>
                                <Radio.Button value="fair">Fair</Radio.Button>
                                <Radio.Button value="good">Good</Radio.Button>
                                <Radio.Button value="new">New</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        
                        <div className="product-column xl:flex lg:block justify-between">
                            <Form.Item label="Season" className="xl:w-5/12 lg:w-full" >
                                <Input placeholder="SS20" onPressEnter={(e)=>setProduct((product) =>{
                                    product.season = e.currentTarget.value;
                                    return({
                                        ...product
                                    })
                                })}/>
                            </Form.Item>
                            <Form.Item label="Retail" className="xl:w-5/12 lg:w-full">
                                <Input prefix="S$" placeholder="400" />
                            </Form.Item>
                        </div>

                        <Form.Item label="Authenticity">
                            <span>100%</span>
                        </Form.Item>

                        <Form.Item label={<LabelWithAsterisk text="Declaration"/>}>
                            <Checkbox className="flex" defaultChecked={product.isDeclarationCheck} checked={product.isDeclarationCheck} onChange={(isChecked) => setProduct((product) =>{
                                    product.isDeclarationCheck = isChecked.target.checked;
                                    return({
                                        ...product
                                    })
                                })}>
                                <span className="declaration-text">
                                I hereby declare that my item is 100% authentic and in the original packaging.In the event that any information given in this application proves to be false or incorrect,I shall be responsible for the consequences.
                                </span>
                            </Checkbox>
                        </Form.Item>

                        <span className="indicate-hint">
                            <span className="text-red-600 mr-1">*</span>
                            <span>indicates required</span>
                        </span>

                        <Form.Item className="action-btn-group">
                            <Button className="action-btn reset-btn" htmlType="button" onClick={onReset}>
                                Cancel
                            </Button>
                            <Button className="action-btn publish-btn" type="primary" htmlType="submit">
                                Publish
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Col>
        </Row>
    );

}

export default AddProductForm; 