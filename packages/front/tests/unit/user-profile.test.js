import { createStore } from 'vuex';
import { screen, render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { userStore } from '../../src/store/user';
import UserProfile from '../../src/pages/user-profile.vue';

function setup() {
    const storeInstance = createStore({ modules: { user: userStore } });
    render(UserProfile, { global: { plugins: [storeInstance] } });
}

describe('UserProfile', () => {
    test('show error message for required fields that are not filled', async () => {
        setup();

        await userEvent.click(screen.getByRole('button', { name: /save/i }));

        expect(await screen.findByText('Old password is required.')).toBeDefined();
        expect(await screen.findByText('New password is required.')).toBeDefined();
        expect(await screen.findByText('Confirm password is required.')).toBeDefined();
    });

    test('show error message when new password and confirm password are not the same', async () => {
        setup();

        await userEvent.type(screen.getByLabelText('New Password'), 'new_password');
        await userEvent.type(screen.getByLabelText('Confirm Password'), 'new#password');

        expect(await screen.findByText('Confirm password must be equal the new password.')).toBeDefined();
    });
});
