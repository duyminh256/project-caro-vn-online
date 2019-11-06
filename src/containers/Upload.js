
import React from "react";
import {Card, CardHeader, CardBody,FormGroup, Label, Input,Form, Row, Col} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {message,Button} from 'antd'
import {addFile,upFile} from '../actions/upload'




const Upload  =  props => {
    const {_stateUpload,_addFile,_upFile,_stateUser} = props;
    if(!_stateUser.allow)
      return(<Redirect to = '/'/>)
        return (
            <div className="container" style={{paddingTop: 30}}>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <CardHeader>
                                TẢI AVATAR LÊN
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm={12}>
                                        <Form encType="multipart/form-data">
                                            <FormGroup>
                                                <Label for="avatar">Chọn Avatar</Label>
                                                <Input
                                                    onChange={(evt) => {
                                                        evt.preventDefault();
                                                        _addFile(evt.target.files[0])
                                                    }}
                                                    type="file" name="avatar" id="avatar"
                                                    placeholder="chọn file"/>
                                            </FormGroup><br/>
                                            <Button size="large" type="primary"
                                                onClick={(evt) => {
                                                    evt.preventDefault()
                                                    if (!_stateUpload.file) {
                                                        message.error('No file chosen');
                                                    }else{
                                                        _upFile(_stateUpload.file,_stateUser.token)
                                                    }
                                                }}
                                            >
                                                Upload
                                            </Button>
                                            &emsp;&emsp;&emsp;&emsp;
                                            <Button size="large" type="default">
                                                <Link to="/profile">Back</Link>
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
    const mapStateToProps = (state) => ({
        _stateUpload: state.upload,
        _stateUser: state.user
      })
      
      const mapDispatchToProps = (dispatch) => ({
        _addFile: file => dispatch(addFile(file)),
        _upFile: (filename,token) => dispatch(upFile(filename,token))
      })
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Upload)