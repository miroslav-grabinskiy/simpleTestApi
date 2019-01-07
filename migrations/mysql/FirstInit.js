module.exports = {
  up: (queryInterface) => {
    const query = [
      "CREATE TABLE `themes` (,",
        "`id` INT NOT NULL AUTO_INCREMENT,",
        "`name` VARCHAR(1024) NULL,",
        "`yes` INT NOT NULL,",
        "`no` INT NULL,",
      "PRIMARY KEY (`id`, `yes`),"
      "UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)";
    ];

    return query.join(" ");
  },

  down: (queryInterface) => {
    const query = [
      "DROP TABLE IF EXISTS `themes`"
    ];

    return query.join("");
  }
};