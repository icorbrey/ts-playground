import { option } from 'utilities/option';

describe('The option utility', () =>
{
	describe('when unwrapping an option', () =>
	{
		const message = 'Inner data was None'
		const data = 'Inner data';

		it('returns the inner data when the value is Some', () =>
		{
			expect(option.some(data).unwrap(message)).toStrictEqual(data);
		})

		it('throws an exception with the given message when the value is None', () =>
		{
			expect(() => option.none().unwrap(message)).toThrow(message);
		})

		describe('when no failure message is provided', () =>
		{
			it('prints a warning in the console', () =>
			{
				jest.spyOn(console, 'warn').mockImplementation();
				option.some(data).unwrap();
				expect(console.warn).toHaveBeenCalledWith(expect.any(String))
			})

			it('throws an exception with a default message when the value is None', () =>
			{
				expect(() => option.none().unwrap()).toThrow(expect.any(String));
			})
		})
	})

	describe('when matching a value', () =>
	{
		const someResult = 'It was Some!';
		const noneResult = 'It was None!';

		it('calls onSome() when the value is Some', () =>
		{
			expect(option.some('value').match({
				onSome: () => someResult,
				onNone: () => noneResult,
			})).toBe(someResult)
		})

		it('calls onNone() when the value is None', () =>
		{
			expect(option.none().match({
				onSome: () => someResult,
				onNone: () => noneResult,
			})).toBe(noneResult)
		})
	})
})
