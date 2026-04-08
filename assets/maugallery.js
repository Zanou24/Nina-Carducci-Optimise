const categories = [
  {
    name: "Tous",
  },
  {
    name: "Concert",
    gallery_tag: "Concert",
  },
  {
    name: "Entreprises",
    gallery_tag: "Entreprises",
  },
  {
    name: "Mariages",
    gallery_tag: "Mariages",
  },
  {
    name: "Portrait",
    gallery_tag: "Portrait",
  },
];
const images = [
  {
    src: {
      small:
        "assets/images/gallery/concerts/aaron-paul-wnX-fXzB6Cw-unsplash-400w.webp",
      medium:
        "assets/images/gallery/concerts/aaron-paul-wnX-fXzB6Cw-unsplash-800w.webp",
    },
    tag: "Concert",
  },
  {
    src: {
      small:
        "assets/images/gallery/concerts/austin-neill-hgO1wFPXl3I-unsplash-400w.webp",
      medium:
        "assets/images/gallery/concerts/austin-neill-hgO1wFPXl3I-unsplash-800w.webp",
    },
    tag: "Concert",
  },
  {
    src: {
      small:
        "assets/images/gallery/entreprise/ali-morshedlou-WMD64tMfc4k-unsplash-400w.webp",
      medium:
        "assets/images/gallery/entreprise/ali-morshedlou-WMD64tMfc4k-unsplash-800w.webp",
    },
    tag: "Entreprises",
  },
  {
    src: {
      small:
        "assets/images/gallery/entreprise/jason-goodman-tHO1_OuKbg0-unsplash-400w.webp",
      medium:
        "assets/images/gallery/entreprise/jason-goodman-tHO1_OuKbg0-unsplash-800w.webp",
    },
    tag: "Entreprises",
  },
  {
    src: {
      small:
        "assets/images/gallery/entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash-400w.webp",
      medium:
        "assets/images/gallery/entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash-800w.webp",
    },
    tag: "Entreprises",
  },
  {
    src: {
      small:
        "assets/images/gallery/mariage/hannah-busing-RvF2R_qMpRk-unsplash-400w.webp",
      medium:
        "assets/images/gallery/mariage/hannah-busing-RvF2R_qMpRk-unsplash-800w.webp",
    },
    tag: "Mariages",
  },
  {
    src: {
      small:
        "assets/images/gallery/mariage/jakob-owens-SiniLJkXhMc-unsplash-400w.webp",
      medium:
        "assets/images/gallery/mariage/jakob-owens-SiniLJkXhMc-unsplash-800w.webp",
    },
    tag: "Mariages",
  },
  {
    src: {
      small:
        "assets/images/gallery/portraits/ade-tunji-rVkhWWZFAtQ-unsplash-400w.webp",
      medium:
        "assets/images/gallery/portraits/ade-tunji-rVkhWWZFAtQ-unsplash-800w.webp",
    },
    tag: "Portrait",
  },
  {
    src: {
      small:
        "assets/images/gallery/portraits/nino-van-prattenburg--443cl1uR_8-unsplash-400w.webp",
      medium:
        "assets/images/gallery/portraits/nino-van-prattenburg--443cl1uR_8-unsplash-800w.webp",
    },
    tag: "Portrait",
  },
];
const gallery = document.querySelector(".gallery");
const imageContainer = document.createElement("div");
imageContainer.className = "gallery-items-row row";

const navItems = document.createElement("ul");
navItems.className = "my-4 tags-bar nav nav-pills";
gallery.appendChild(navItems);
// Génère les boutons
categories.forEach((category, index) => {
  const tagElements = document.createElement("li");
  tagElements.className = "nav-item";
  const tagElement = document.createElement("span");
  tagElement.className = "nav-link";
  tagElement.textContent = `${category.name}`;
  if (index === 0) {
    tagElement.classList.add("active");
  }

  tagElement.addEventListener("click", () => {
    // ❌ enlève active sur tous les boutons
    document
      .querySelectorAll(".nav-link")
      .forEach((btn) => btn.classList.remove("active"));

    // ✅ ajoute active sur celui cliqué
    tagElement.classList.add("active");

    afficherImages(category.gallery_tag);
  });

  navItems.appendChild(tagElements);
  tagElements.appendChild(tagElement);
});
gallery.appendChild(imageContainer);

// Génère les images selon le tag
function afficherImages(tag) {
  imageContainer.innerHTML = ""; // Vide le conteneur

  const filteredImages = tag
    ? images.filter((img) => img.tag === tag) // Filtre par tag
    : images; // "tous" → pas de filtre

  filteredImages.forEach((img, index) => {
    const imgContainerElement = document.createElement("div");
    imgContainerElement.className =
      "item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4";
    const imgElement = document.createElement("img");
    imgElement.src = img.src.small;
    imgElement.srcset = `
  ${img.src.small} 400w,
  ${img.src.medium} 800w,
  ${img.src.large} 1200w
`;
    imgElement.sizes = "(max-width: 768px) 100vw, 33vw";
    imgElement.alt = img.tag;
    imgElement.className = "gallery-item img-fluid";

    imgElement.addEventListener("click", () => ouvrirModal(tag, index));

    imageContainer.appendChild(imgContainerElement);
    imgContainerElement.appendChild(imgElement);
  });
}
// Création de la modale dans le DOM
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <span class="modal-close">&times;</span>
  <button class="modal-prev">&#8592;</button>
  <img class="modal-img" src="" alt="">
  <button class="modal-next">&#8594;</button>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector(".modal-img");
let currentImages = [];
let currentIndex = 0;

// Ouvre la modale
function ouvrirModal(tag, index) {
  currentImages = tag ? images.filter((img) => img.tag === tag) : images;
  currentIndex = index;
  modalImg.src = currentImages[currentIndex].src.medium;
  modal.classList.add("activate");
}

// Navigation
function afficherImage(index) {
  currentIndex = (index + currentImages.length) % currentImages.length; // boucle
  modalImg.src = currentImages[currentIndex].src.medium;
}

modal
  .querySelector(".modal-prev")
  .addEventListener("click", () => afficherImage(currentIndex - 1));
modal
  .querySelector(".modal-next")
  .addEventListener("click", () => afficherImage(currentIndex + 1));
modal
  .querySelector(".modal-close")
  .addEventListener("click", () => modal.classList.remove("activate"));

// Fermer en cliquant en dehors de l'image
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("activate");
});

// Navigation clavier
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("activate")) return;
  if (e.key === "ArrowRight") afficherImage(currentIndex + 1);
  if (e.key === "ArrowLeft") afficherImage(currentIndex - 1);
  if (e.key === "Escape") modal.classList.remove("activate");
});

// Affiche tout au chargement
afficherImages(null);
