import React from 'react';
import { shallow } from 'enzyme';
import PublishedListingsCard from './components/PublishedListingCard';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('published listing card', () => {
  const listing = {
    id: 'id',
    title: 'title',
    thumbnail: 'thumbnail',
    reviews: [
      {
        rating: '4',
        review: 'nice house'
      }
    ]
  };
  const idx = 2;

  it('should render a form with a header, two inputs and a submit button', () => {
    function wrapped (props) {
      const { children } = props;
      return (
        <Router>
          {children}
        </Router>
      )
    }

    const wrapper = shallow(
      <PublishedListingsCard token={'token'} listing={listing} idx={idx}/>, {
        wrappingComponent: wrapped,
      }
    );
    expect(wrapper.find('div')).toHaveLength(3);
    expect(wrapper.find('img')).toHaveLength(1);
  })

  // it('should call navigate function when card is clicked', () => {
  //   function wrapped(props) {
  //     const {children} = props;
  //     return (
  //       <Router>
  //         {children}
  //       </Router>
  //     )
  //   }
  //   const wrapper = shallow(
  //     <PublishedListingsCard token={'token'} listing={listing} idx={idx}/>, {
  //       wrappingComponent: wrapped,
  //     }
  //   );
  //   wrapper.simulate('click');
  //   expect(mockedUsedNavigate).toHaveBeenCalled();
  // })
});
