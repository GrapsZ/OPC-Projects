<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress_3');

/** MySQL database username */
define('DB_USER', 'wordpress_7');

/** MySQL database password */
define('DB_PASSWORD', 'GVd7I24pv_');

/** MySQL hostname */
define('DB_HOST', 'localhost:3306');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'GRi^(H5kvWCGJJU!PwawKp7^^)smo4oUOp#O(phbu2@ruSHg1VK)ZdEK0@iyYhyr');
define('SECURE_AUTH_KEY',  'vPeaEXQfQ2rmQ1o2^!Wx*65Q43@*N5gH6x#iqT6V8d0(rg^RR5mrwPGL!eXKUkWp');
define('LOGGED_IN_KEY',    'n#(*ckxJOLahkr9kI)ONGv99dm!PzIX3%lDOue5chIxWakEG3hzBu26d8QIA0svD');
define('NONCE_KEY',        'obJNMDaT)fQaiIU(&4@OihyI2D1!9QpObqz^@s)qN)iPmP&SD(H4QwadE0oqOc)E');
define('AUTH_SALT',        '%bS)N*yAz&FCh2)IPoqYl#jR*!B*Q2I#w@WgTW9fpFrr(im5Bo^IBYesbyK%WnTW');
define('SECURE_AUTH_SALT', 'ggKNxnCqFcwD%3u^8EChfehmr8O4)gzMBR8oxzMO4FJfmCOT(FXf*UiovWm&ARiE');
define('LOGGED_IN_SALT',   '5TbBxxY^pdrLw!6GBNf2YdRWbQx7wTz2H(ilgJ&lL(pMcypNS&wn#kbiyoFkwUT3');
define('NONCE_SALT',       'Pw5EpNbkAHY8k&k5h*mrMlNyqKe*W97SDDQ**R3kBEGrlo!f92VswsY^%uPiaym%');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'ysC2L1_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

define( 'WP_ALLOW_MULTISITE', true );

define ('FS_METHOD', 'direct');
