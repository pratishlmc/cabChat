/** @type {import('next').NextConfig} */

const withPwa = require('next-pwa');

module.exports = withPwa({

    dest: 'public',

});