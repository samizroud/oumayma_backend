
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
// Créer une nouvelle compétence
router.post("/create", skillController.createSkill);

// Obtenir toutes les compétences
router.get("/getAllSkills", skillController.getAllSkills);

// Obtenir une compétence par son ID
router.get("/:id", skillController.getSkillById);

// Mettre à jour une compétence
router.put("/updateSkill/:id", skillController.updateSkill);

// Supprimer une compétence
router.delete("/deleteSkill/:id", skillController.deleteSkill);

module.exports = router;



