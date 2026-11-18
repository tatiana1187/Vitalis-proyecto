/* Fotos y datos locales del catálogo (imágenes y respaldo si el servidor no responde) */
const B = "https://sites.google.com/sitesv-images-rt/";
const FOTOS = [
  B+"APXyLQf3FjlNDizfXhVQ4aMVoe8rahDCIDjJJ_3jZODLH7z_7T2YJ6b8PIvDGASVKIjoYQyPObfQcp301LGWfJAhlNguqZZzyqQsZ0unhA-sQMj0i0u-aJsTPimf9Pg5oAhwbac0q-59Pj6vBOWoJuNvUUQl1A-Xocu-e3Bb_h8mpgAxwl5Dtm_CCZkqtUj8DnK9jpT06uaTVLhgl65aD3LIcpY5jFoPEL6bplXpY8Gg=w1280",
  B+"APXyLQfrEaFqEu2gHJ85ogxVA7-S9XMwa4AkCLrIHGt3YV-6qT8aQdRie944B-i6MDiNAhG-ve89RDkf1A7zmDSLxwX2hRbqCRbqengqIuAH4erMqHj1vlt84e5Wny5Sp4vHl9NhFoXcbc3o5WLqa-5drTulancmc7yaM6DhEwbPqFeJjl54fXYMUlRVyOK7LY_Xr5Qxq6nX2blwTnsZUtyGAw5deDmaWHAH26J1uxIcarU=w1280",
  B+"APXyLQeaQAF6rf2bdcbRXON9gKaVbPXeUHSjDg5F1XGHD0rCzMa5Z4m5H3e2t2IWw9-nQN9XWgc61ip7R4AyTUuw5_p7oWBsMIVfuzXky0Nk-3SoIB3KvvG1LcqlHAlbrxEvpUywGN7H_jf4u-KfZWBSNvlq6ZQW2Ia2dZrYTXBaKkKhsjy0K8MDyVvpYwDXWR6AvXOk_ZKw8K33kb9EpPMkAJayb3Fwc93p4Br_Epv1KzA=w1280",
  B+"APXyLQc-9w_ytsLyKkssHh-8UVpusenTXjLJrB0fzIsl6Y7WZJ79RzvHkfEgjjjI9znu83ptAAMszFylgMp9RThyvm3FdNTf3Iv9u0ocO0ejPYU1OCuN3TKAQMhaBd5cxLa46IZT2gjwUnCx-xZfB7jd-8Cdsx_dOXjCUusuJpHV2H3JSv4bKFTOcCEzW4__Saiskq_-a-j0jgoX1IBraDeO1qn9XOxcWURbcBLKc_NX4h4=w1280",
  B+"APXyLQc01c9MN7wDfzbgk_mJSLNND5HSrBaRAGtNDSVnOQ7sj9b49dClwFwb1sbgrv1egIG0B8_Aa_Erd5VekcRUIAhRnh3qMOui2UY_wBug--f0ahpUF-_ptEctz-aKWXglu0lRvpmqjgFxz0TseLHb3Q9aHhchVbYM_pPLNSZRGFVsb2BlocqB4bThhqCpsnQEd1NTOI4ZJPrxewqioHHR3bnN8iUHFhNY3RnkdujJUAo=w1280",
  B+"APXyLQc7Gte-R_fP0g6w-PP8LqMKyxcpa5xsRuPXAZd7Y2ORUOJc7EbzvyYLidIXCsXaRAAprPE_KMnlRUVzkSmGEFs3hdBLgbUIUMMWKZ2e0e0qXOTVbsr3Goz6es_rxEYAWTaH8Iu81NrB1Fou6LPMzETz1KhPeJj5pH6qjkZQUn2ncsMDdEZAVH0rmwHBDDmkyAtaY9TJVaD0u3H4ERCO1nhQeDJARsmivvwuaq8w=w1280",
  B+"APXyLQd1_EFL9J4-_wJrpg-X5F616NSQ7eR4XUY6UXcDYPSalcy6YOYEHaW-TUY-iwB9RO7yxsOn_7v_fDQpt36OrUpOaY13yFtjcFUyXXdrWCz_3KY2mdtt6w8v2o0MpzNLArbIqZwbXKyxndu0q4MGEbpVbkjCTiyqR2i-an3ueKZSwMj5g4DtXD65pjO3jVpRCesqZoqWhH4BHohBNLb-Pzy4sNdAg_OUep86kjflf0M=w1280",
  B+"APXyLQeIVPmRHNaeWcyE0AfpqGVhhgRyMfEuwLlgjhOT19SSiNq_V01pSgKplBqbHpBQRI-hCtTDqt9RJfouxs4-0p1ZV3CK8V3VbqOvuYotHKEw9b2Rkska15n4zUgiHqNoinWSt5iEp2494nxrlHLjPUeE6B594updzV9PNCftX-tn0aDY1F0Ot2ltTjp87EnxKUrxkKLzUfSpo3sACrjaDggqXSk97eHsICcj1ake=w1280",
  B+"APXyLQe5U7ta1J47HDP75W0g_p7u-crd0iV4Z1TknZrOOAZT_HkbIL6EJEMrBMN4iqlc3PWFEY61Jy7pIhEu_JPnW9EgIYmdquZ0pj61VukAsiKSzCFffklyCc2i-OhTMGn0KlFMVEbngTsEh7Kv3s5cqwFPmtjAUNVN5mDdwo93XFXQqOqjPpy6RkP0JHn8-ieOAGWpuc2_iSN40-ZQ2wykgTGQtjAk_Xg9kBD14zHTqRk=w1280",
  B+"APXyLQcoT1gseaAkvfQsOP0KV6vOthk2WDqFot_PJcVyAwtY-XM_zweGzWofEFX48G2ex8U4w00zQf8AHTcbLBG8eqwI-fYF4CRqg1-PW-lZbdBpx1s_LK4aSspKZLuj9Ar2frx56owvax-sjrK4r3lusRMg1is79oOYEr_t9y4m9R3Q8I2HtQ3VynKhYSG2PikX1rNYCwGyvmCDHaveaxKPqAJd4qkms_dsJXiL0F79-dQ=w1280",
  B+"APXyLQf376mD5liF64A74srjxr-0q10LG7JLDDrKTQO_kO_h1Z8wlwtHeZpxa2_S3oflocqtcNa8jG6Zi8FuCFjpDfc1eQmaH8GPv5KlomJRXin5pFKavQv1YDKECCWCxbIJNe1B_oltzj6oCClZprLjDnwOVMDb1hkfKOUMzbTUzX6mnZum7sktG-8--ku563U-J8tFAawszyhgq5b86cej7dnbcXAPOhtZHNULyXfI=w1280",
  B+"APXyLQfovuhBcbZ4ZQh1qlKcWwhL-y9p1mnkHVdnzhSKnGt4PcJKLbHmA326MylNwO9URB9Y_6-TV_VvHqWW1OMtiHUuDkfKROyE9Q6bVl0u3C7x8HyQC2OlKy0KaWK_glXLet0VT-PAoLcVhgLB3aWyu8TJeajDn3bHsY80m53CnuQ9-4WixLZPkXa7mRWmXwnFYIGJFDKDeHM80FzEBVQ4-aM6AimYAHYW0F6_NMKg=w1280"
];

/* ===== PRODUCTOS: agregá, editá o quitá objetos de esta lista =====
   las fotos se toman de FOTOS; si falta una, se usa un placeholder */
const productos = [
  { nombre:"Ambo verde", claves:["Cómodo","Moderno","Funcional"], precio:45000, color:"2e9e6b" },
  { nombre:"Ambo blanco con detalles azules", claves:["Cómodo","Elegante","Moderno"], precio:44000, color:"8fb4dd" },
  { nombre:"Ambo azul clásico", claves:["Elegante","Cómodo","Profesional"], precio:48000, color:"1b5ea8" },
  { nombre:"Ambo estampado", claves:["Colorido","Original","Cómodo"], precio:46000, color:"e08a3c" },
  { nombre:"Ambo blanco", claves:["Clásico","Funcional","Profesional"], precio:42000, color:"9aa8b2" },
  { nombre:"Ambo floral rosa", claves:["Fresco","Delicado","Cómodo"], precio:46000, color:"d9739a" },
  { nombre:"Ambo negro", claves:["Elegante","Cómodo","Versátil"], precio:47000, color:"2b2f36" },
  { nombre:"Ambo azul con cierre", claves:["Práctico","Moderno","Funcional"], precio:50000, color:"2a7fc4" },
  { nombre:"Ambo azul marino", claves:["Moderno","Resistente","Profesional"], precio:48000, color:"14305c" },
  { nombre:"Ambo verde botella", claves:["Elegante","Cómodo","Distintivo"], precio:45000, color:"1f5a45" },
  { nombre:"Ambo beige", claves:["Suave","Elegante","Moderno"], precio:50000, color:"b39b7a" },
  { nombre:"Ambo verde oscuro", claves:["Clásico","Cómodo","Funcional"], precio:48000, color:"2d5240" }
].map((p,i) => ({ ...p, img: FOTOS[i] || `https://placehold.co/400x500/${p.color}/ffffff?text=${encodeURIComponent(p.nombre)}` }));


export { productos, FOTOS };
export const HERO = 'https://sites.google.com/sitesv-images-rt/APXyLQdIFtKniO85xXdtpqRWQhPxirF4kRtp-0HEnKYZCmsnqPe0sVvZWYPeSHo9DTdb2crPdrrH4fWXBmWZzTgBCRxFonbIH1_YtKR2vPvzdAnNR36pGG_QEPftIRmoFK3d0hL-BOIw5gK2f1ihWzP4GHrbCXwsohD5vZtGUN0Dx5J90wuGzxj2H-fJ0noxhPEpC61gH1qT2ljAP8b-RQgzYZMbVSIHOboE4jysW2jMymI=w1280';
export const SECCIONES = ['https://sites.google.com/sitesv-images-rt/APXyLQd1X_NY7ZpGZ6vIg6n1Fw2dqWxon8m7meOwFEXX7EozmLTSfwQYnlS0nz5CPdBnlmgSTgDdDxWq_xFi38UzwwENq0iTcm-Vsn17Q_mpa_3zX2t3P0hYtzJgTVEjD41Nf6-nb3qvsmWcBDfmw7njhh7iUEuV3CClpVuWOC59fkifr0j2GjDz7Sehj2s7wGqO1kFbqzsrBe-EtMVyfsjjHX2TrfqQBYhlEvJO67ZUZ14=w1280', 'https://sites.google.com/sitesv-images-rt/APXyLQdJXMwnWmcF9casB5Pggx3vrK39oYk_kvtq7ESmGIhJ05sd5WHcBo-8XVycxPXmWbFFroICZB2yBQKbz8L91V9VHl3OK8msUGfONmMXtfr13s8w3v1KsHiXEWgbTonfyUIcbpvwIen0z1jovm3x3doTbnGVfb_7UjToiXa-z67MTPpE9cgVQTGwQBrVpqpbKwsNInW3L3bnHDqfnUezmXDoeYmm0WhqPZKnwlwd99Y=w1280', 'https://sites.google.com/sitesv-images-rt/APXyLQd-N1tsXekAGG_sXureEQR4N-3Aj0Il6_sUn-kPTo6E1XuNYBu1uoqcJDzlNZYonZMe-Xs5T2MpkAsi3mdBqy713C3ZrOaRDbw7cI5eNX6-5o6IjeX1sO2MCLXILqyWueAQok40LuVSNhx1x_W7WfVSnTW4sz_8l_L9YNAhUx50rJRgmAU4UGOOM_wPc_uwsMLgxP6wSCayRJuS8dbiw_bwcGzSAHeAiYMdxirPjlA=w1280', 'https://sites.google.com/sitesv-images-rt/APXyLQf27dymwVUxpgj7NOmLkNMr44AmectolKVFbxoodoemwrNfROCnAhOWD5-m3HbMYs1IvfaiwHKOnDPVpcPmdH8yq7m7xXiINM81RgxaYId3qTJ1tTWAwGZOQF44GA7c9UO-K5duAvtty7fT1in0Mi3CMY2mrCwNeq8vgCqYgRgTYboa5Krm68HwCuHJYaa-0FquRwA7-vYr3BqQLtBVR0_pHBmrelgoffhvKMh9tUY=w1280'];
