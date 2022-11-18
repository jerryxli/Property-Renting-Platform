import { shallow } from 'enzyme';
import Login from './pages/Login';
import BigButton from './components/BigButton'

describe('Login', () => {
    const noop = () => {};

    it('should render a form with two inputs and a button', () => {
        const wrapper = shallow(<Login setTokenFn={noop}/>);

        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
        expect(wrapper.find('input[type="password"]')).toHaveLength(1);
        expect(wrapper.find(BigButton)).toHaveLength(1);
    });

    it('should login in successfully when submit button is clicked', () => {
        const wrapper = shallow(<Login setTokenFn={noop}/>);
        const email = wrapper.find('input[type="text"]');
        const password = wrapper.find('input[type="password"]');
        email.simulate('change', { target: { value: 'a@gmail.com' } });
        password.simulate('change', { target: { value: 'password' } });

        const button = wrapper.find(BigButton);
        button.simulate('click');
        // when logged in, input fields are cleared
        expect(email.text()).toEqual('');
        expect(password.text()).toEqual('');
    })
});