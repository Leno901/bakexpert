const games = [
  {
    slug: "game1",
    title: "Specialty Cake",
    steps: [
      {
        step: "Preheat the oven and prepare the pans.",
        question:
          "What is the correct first step when baking a specialty cake?",
        options: [
          {
            text: "Preheat the oven to the required temperature and grease the pans with parchment paper.",
            isCorrect: true,
            image: "/src/assets/image/specialty_cake_step1a.jpg",
          },
          {
            text: "Grease the pans but skip preheating the oven to save energy.",
            isCorrect: false,
            image: "/src/assets/image/specialty_cake_step1b.jpg",
          },
        ],
      },
      {
        step: "Mix the dry ingredients.",
        question: "What is the best method to prepare the dry ingredients?",
        options: [
          {
            text: "Sift together the flour, baking powder, baking soda, and any spices for even mixing.",
            isCorrect: true,
            image: "/src/assets/image/specialty_cake_step2a.jpg",
          },
          {
            text: "Stir the dry ingredients together in a bowl without sifting.",
            isCorrect: false,
            image: "/src/assets/image/specialty_cake_step2b.jpg",
          },
        ],
      },
      {
        step: "Prepare the wet ingredients.",
        question: "How should the wet ingredients be combined?",
        options: [
          {
            text: "Whisk together the oil, eggs, sugar, and flavorings until smooth and creamy.",
            isCorrect: true,
            image: "/src/assets/image/specialty_cake_step3a.jpg",
          },
          {
            text: "Mix all wet ingredients quickly without ensuring smooth consistency.",
            isCorrect: false,
            image: "/src/assets/image/specialty_cake_step3b.jpg",
          },
        ],
      },
      {
        step: "Combine wet and dry ingredients.",
        question: "What is the proper way to mix wet and dry ingredients?",
        options: [
          {
            text: "Gradually add the dry ingredients into the wet mixture, folding gently to avoid overmixing.",
            isCorrect: true,
            image: "/src/assets/image/specialty_cake_step4a.jpg",
          },
          {
            text: "Add the dry and wet ingredients together all at once and mix vigorously.",
            isCorrect: false,
            image: "/src/assets/image/specialty_cake_step4b.jpg",
          },
        ],
      },
      {
        step: "Bake the cake.",
        question: "What should you do when baking the specialty cake?",
        options: [
          {
            text: "Pour the batter evenly into the prepared pans and bake at the specified temperature until a toothpick comes out clean.",
            isCorrect: true,
            image: "/src/assets/image/specialty_cake_step5a.jpg",
          },
          {
            text: "Pour the batter into the pans and bake without checking the cake's doneness during the recommended time.",
            isCorrect: false,
            image: "/src/assets/image/specialty_cake_step5b.jpg",
          },
        ],
      },
    ],
  },
  {
    slug: "game2",
    title: "Petit Four Game",
    steps: [
      {
        step: "Preheat the oven and prepare the pans.",
        question: "What is the correct first step when baking petit fours?",
        options: [
          {
            text: "Preheat the oven to the required temperature and line the pans with parchment paper for even baking.",
            isCorrect: true,
            image: "INSERT PICTURE",
          },
          {
            text: "Grease the pans but skip preheating the oven to save energy.",
            isCorrect: false,
            image: "INSERT PICTURE",
          },
        ],
      },
      {
        step: "Mix the dry ingredients.",
        question:
          "What is the best method to prepare the dry ingredients for petit fours?",
        options: [
          {
            text: "Sift together the flour, baking powder, and salt to ensure even distribution.",
            isCorrect: true,
            image: "INSERT PICTURE",
          },
          {
            text: "Stir the dry ingredients directly without sifting, to save time.",
            isCorrect: false,
            image: "INSERT PICTURE",
          },
        ],
      },
      {
        step: "Prepare the wet ingredients.",
        question: "How should the wet ingredients be combined for petit fours?",
        options: [
          {
            text: "Cream the butter and sugar together until light and fluffy, then gradually add eggs and vanilla extract.",
            isCorrect: true,
            image: "INSERT PICTURE",
          },
          {
            text: "Mix all wet ingredients quickly without creaming for a faster process.",
            isCorrect: false,
            image: "INSERT PICTURE",
          },
        ],
      },
      {
        step: "Combine wet and dry ingredients.",
        question:
          "What is the proper way to mix wet and dry ingredients when making petit fours?",
        options: [
          {
            text: "Gradually add the dry ingredients into the wet mixture, folding gently to maintain a light texture.",
            isCorrect: true,
            image: "INSERT PICTURE",
          },
          {
            text: "Add the wet and dry ingredients together all at once and mix thoroughly without folding.",
            isCorrect: false,
            image: "INSERT PICTURE",
          },
        ],
      },
      {
        step: "Bake and prepare the petit fours.",
        question: "How should you handle the petit fours after baking?",
        options: [
          {
            text: "Bake the batter in a thin, even layer, cool completely, and cut into uniform shapes before decorating.",
            isCorrect: true,
            image: "INSERT PICTURE",
          },
          {
            text: "Bake the batter, cut the shapes immediately while hot, and decorate before they cool down.",
            isCorrect: false,
            image: "INSERT PICTURE",
          },
        ],
      },
    ],
  },
];

export default games;
