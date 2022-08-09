import React from 'react';
import { Story } from '@storybook/react';
import Avatar from './index';

interface Props {
    name: string;
}

export default {
    title: 'Components/Avatar',
    components: Avatar
};

const Template: Story<Props> = (args) => <Avatar  {...args} />;

export const Default = Template.bind({});

Default.args = {
    name: 'Gabriel',
};
