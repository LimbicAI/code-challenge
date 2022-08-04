import { Story, Meta } from '@storybook/react';
import Button, { Props } from './Button';

const meta: Meta = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        onClick: { action: 'clicked' },
        children: {
            defaultValue: 'Default Text'
        }
    }
};

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});


export default meta;
