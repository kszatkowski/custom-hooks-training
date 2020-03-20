import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from './useFetch';

describe('useFetch', () => {
  const mockedImplementation = Promise.resolve<any>({
    json: () => Promise.resolve({
      data: 'Example data',
    })
  });

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockedImplementation)
  });

  it('should return default value', async () => {
    const { result } = renderHook(() => useFetch(''));
    expect(result.current).toEqual([]);
    await act(() => mockedImplementation);
  });

  it('should make api call and set data in state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch(''));
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalled();
    expect(result.current).toEqual({ data: 'Example data' });
  });
});
