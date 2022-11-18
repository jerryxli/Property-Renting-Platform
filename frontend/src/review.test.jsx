import React from 'react';
import { shallow } from 'enzyme';
import ReviewSection from './components/ReviewSection';

describe('review listing', () => {
  const token = 'token';
  const listingId = '1';
  const bookingId = 2;

  it('should render a form with a header, two inputs and a submit button', () => {
    const wrapper = shallow(<ReviewSection token={token} listingId={listingId} bookingId={bookingId}/>);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('input[type="text"]')).toHaveLength(2);
    expect(wrapper.find('button')).toHaveLength(1);
  })

  it('should submit review when submit button is clicked', () => {
    const wrapper = shallow(<ReviewSection token={token} listingId={listingId} bookingId={bookingId}/>);
    const rating = wrapper.find('input[placeholder="Rating /5"]');
    const review = wrapper.find('input[placeholder="Leave a Review"]');

    rating.simulate('focus')
    rating.simulate('change', { target: { value: '4' } });
    review.simulate('focus');
    review.simulate('change', { target: { value: 'nice house' } });

    const button = wrapper.find('button');
    button.simulate('click');
    // when review submitted, input fields are cleared
    expect(rating.text()).toEqual('');
    expect(review.text()).toEqual('');
  })
});
