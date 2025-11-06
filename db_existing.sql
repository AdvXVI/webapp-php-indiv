-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2025 at 01:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webapptest`
--
CREATE DATABASE IF NOT EXISTS `webapptest` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `webapptest`;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'Juan Test', 'juan@test.com', 'Hello, Test.', '2025-10-14 08:41:13');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(2, 'Action'),
(5, 'Exploration'),
(7, 'FPS'),
(8, 'Metroidvania'),
(1, 'Open World'),
(6, 'Psychological Horror'),
(4, 'Romance'),
(9, 'Souls-like'),
(3, 'Visual Novel');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `slug`, `name`, `price`, `description`, `created_at`) VALUES
(1, 'gta', 'Grand Theft Auto', 350.00, 'Grand Theft Auto V Enhanced, best game.', '2025-10-14 16:44:35'),
(2, 'until-youre-mine', 'Until You\'re Mine', 225.00, 'A gripping visual novel about choices and consequences.', '2025-10-14 16:59:37'),
(3, 'peak', 'Peak', 185.00, 'Reach the peak!!!', '2025-10-14 17:00:24'),
(4, 'god-of-war', 'God of War', 565.00, 'Epic battles and mythological adventures in God of War.', '2025-10-14 17:02:24'),
(5, 'ddlc', 'Doki Doki Literature Club', 200.00, 'The Literature Club is full of cute girls! Will you write the way into their heart? This game is not suitable for children or those who are easily disturbed.', '2025-10-14 17:03:40'),
(6, 'cs', 'Counter-Strike', 150.00, 'Play the world\'s number 1 online action game. Engage in an incredibly realistic brand of terrorist warfare in this wildly popular team-based game. Ally with teammates to complete strategic missions. Take out enemy sites. Rescue hostages. Your role affects your team\'s success.', '2025-10-14 17:05:25'),
(7, 'silksong', 'Silksong', 340.00, 'Explore, fight and survive as you ascend to the peak of a land ruled by silk and song.', '2025-10-14 17:06:59');

-- --------------------------------------------------------

--
-- Table structure for table `product_genres`
--

CREATE TABLE `product_genres` (
  `product_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_genres`
--

INSERT INTO `product_genres` (`product_id`, `genre_id`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(4, 2),
(5, 3),
(5, 6),
(6, 7),
(7, 8),
(7, 9);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_path`) VALUES
(1, 1, '/public/prod_img/gta.webp'),
(2, 1, '/public/prod_img/gta1.jpg'),
(3, 1, '/public/prod_img/gta2.jpg'),
(4, 1, '/public/prod_img/gta3.jpg'),
(5, 1, '/public/prod_img/gta4.jpg'),
(6, 1, '/public/prod_img/gta5.jpg'),
(7, 2, '/public/prod_img/uym.png'),
(8, 2, '/public/prod_img/uym1.png'),
(9, 2, '/public/prod_img/uym2.png'),
(10, 2, '/public/prod_img/uym3.png'),
(11, 2, '/public/prod_img/uym4.png'),
(12, 2, '/public/prod_img/uym5.png'),
(13, 3, '/public/prod_img/peak.webp'),
(14, 3, '/public/prod_img/peak1.png'),
(15, 3, '/public/prod_img/peak2.png'),
(16, 3, '/public/prod_img/peak3.png'),
(17, 3, '/public/prod_img/peak4.png'),
(18, 3, '/public/prod_img/peak5.png'),
(19, 4, '/public/prod_img/gow.jpg'),
(20, 4, '/public/prod_img/gow1.jpg'),
(21, 4, '/public/prod_img/gow2.jpg'),
(22, 4, '/public/prod_img/gow3.jpg'),
(23, 4, '/public/prod_img/gow4.jpg'),
(24, 4, '/public/prod_img/gow5.jpg'),
(25, 5, '/public/prod_img/ddlc.png'),
(26, 5, '/public/prod_img/ddlc1.jpg'),
(27, 5, '/public/prod_img/ddlc2.jpg'),
(28, 5, '/public/prod_img/ddlc3.jpg'),
(29, 5, '/public/prod_img/ddlc4.jpg'),
(30, 5, '/public/prod_img/ddlc5.jpg'),
(31, 6, '/public/prod_img/cs.jpg'),
(32, 6, '/public/prod_img/cs1.jpg'),
(33, 6, '/public/prod_img/cs2.jpg'),
(34, 6, '/public/prod_img/cs3.jpg'),
(35, 7, '/public/prod_img/silksong.jpg'),
(36, 7, '/public/prod_img/silksong1.webp'),
(37, 7, '/public/prod_img/silksong2.jpg'),
(38, 7, '/public/prod_img/silksong3.avif'),
(39, 7, '/public/prod_img/silksong3.jpg'),
(40, 7, '/public/prod_img/silksong4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `product_genres`
--
ALTER TABLE `product_genres`
  ADD PRIMARY KEY (`product_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_genres`
--
ALTER TABLE `product_genres`
  ADD CONSTRAINT `product_genres_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
