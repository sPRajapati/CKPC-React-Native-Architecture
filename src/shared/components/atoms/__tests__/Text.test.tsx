import renderer, { act } from 'react-test-renderer';

import { Text } from '../Text';

describe('Text atom', () => {
  it('matches the title typography snapshot', () => {
    let tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = null;

    act(() => {
      tree = renderer
        .create(<Text variant="title">CPKC title</Text>)
        .toJSON();
    });

    expect(tree).toMatchSnapshot();
  });
});
