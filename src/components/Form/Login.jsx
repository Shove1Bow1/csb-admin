import { Field, Form, Formik } from "formik"
import { loginRequest } from "../../axios/axios.login"
import { validateName, validatePassword } from "../../validator/validate-form.login"
import './Form.sass'
export const LoginForm = () => {
    return (
        <Formik
            initialValues={{
                name: '',
                password: '',
                serverError:'',
            }}
            onSubmit={(values) => {
                const error=validateName(values.name)||validatePassword(values.password);
                if(error){
                    return;
                }
                const data=loginRequest(values.name,values.password);
                console.log(data.result);
            }}
        >
            {({ errors, touched, isValidating, validateForm }) => {
                return (
                    <Form className='formik'>
                        <legend className="formik-legend">PAGE ADMIN CSB</legend>
                        <div className='formik-block'>
                            <label className="formik-label">Admin name</label>
                            <Field name='name' placeHolder='Admin name' type='text' validate={validateName} className='formik-field'/>   
                        </div>
                        <span className='formik-error'>{(touched.name && errors.name)?errors.name:null}</span>
                        <div className='formik-block'>
                            <label className='formik-label'>Password</label>
                            <Field name='password' placeHolder='Password' type='password' validate={validatePassword} className='formik-field'/>
                        </div>
                        <span className='formik-error'>{(touched.password && errors.password)?errors.password:null}</span>
                        <span className='formik-error'>{(touched.serverError && errors.serverError)?errors.serverError:null}</span>
                        <button className="formik-button" type="submit">Login</button>
                    </Form>
                )
            }}

        </Formik>
    )
}