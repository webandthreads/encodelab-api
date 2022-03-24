CREATE DATABASE IF NOT EXISTS `encodelab`;
CREATE DATABASE IF NOT EXISTS `encodelab_test`;

CREATE USER 'encodelab_user'@'%' IDENTIFIED BY 'password123';
GRANT ALL ON encodelab.* TO 'encodelab_user'@'%';
GRANT ALL ON encodelab_test.* TO 'encodelab_user'@'%';
