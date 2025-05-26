let level1;

function initLevel() {
  level1 = new Level(
    [
      new PufferFish(),
      new PufferFish(),
      new JellyFish(),
      new JellyFish(),
      new Endboss()
    ],
    [
      new Sunlight()
    ],
    [
      new BackgroundObject('./img/backgrounds/water/2.png', -960),
      new BackgroundObject('./img/backgrounds/background_layer_2/2.png', -960),
      new BackgroundObject('./img/backgrounds/background_layer_1/2.png', -960),
      new BackgroundObject('./img/backgrounds/ground/2.png', -960),

      new BackgroundObject('./img/backgrounds/water/1.png', 0),
      new BackgroundObject('./img/backgrounds/background_layer_2/1.png', 0),
      new BackgroundObject('./img/backgrounds/background_layer_1/1.png', 0),
      new BackgroundObject('./img/backgrounds/ground/1.png', 0),

      new BackgroundObject('./img/backgrounds/water/2.png', 960),
      new BackgroundObject('./img/backgrounds/background_layer_2/2.png', 960),
      new BackgroundObject('./img/backgrounds/background_layer_1/2.png', 960),
      new BackgroundObject('./img/backgrounds/ground/2.png', 960),

      new BackgroundObject('./img/backgrounds/water/1.png', 960 * 2),
      new BackgroundObject('./img/backgrounds/background_layer_2/1.png', 960 * 2),
      new BackgroundObject('./img/backgrounds/background_layer_1/1.png', 960 * 2),
      new BackgroundObject('./img/backgrounds/ground/1.png', 960 * 2),
      new BackgroundObject('./img/backgrounds/water/2.png', 960 * 3),
      new BackgroundObject('./img/backgrounds/background_layer_2/2.png', 960 * 3),
      new BackgroundObject('./img/backgrounds/background_layer_1/2.png', 960 * 3),
      new BackgroundObject('./img/backgrounds/ground/2.png', 960 * 3)
    ]
  );
}
