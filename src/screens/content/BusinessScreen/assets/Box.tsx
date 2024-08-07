import { SvgXml } from "react-native-svg";

function Box() {
  const xml = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.21864 16.2226C6.21891 16.2223 6.21923 16.222 6.21957 16.2216C6.21582 16.2258 6.21507 16.2261 6.21864 16.2226ZM6.28457 16.1686C6.29043 16.1642 6.29673 16.1596 6.3035 16.1547C6.41086 16.0774 6.57883 15.9755 6.81466 15.8505C7.28305 15.6022 7.94469 15.3016 8.75083 14.966C10.3585 14.2967 12.4762 13.5143 14.6232 12.7668C16.7681 12.02 18.9306 11.312 20.6236 10.7915C21.4708 10.531 22.1953 10.3191 22.7388 10.1731C23.0112 10.0999 23.2315 10.0451 23.3957 10.0091C23.5121 9.98369 23.5754 9.97357 23.6006 9.96954C23.6027 9.96921 23.6045 9.96892 23.6061 9.96867C23.6075 9.9689 23.6091 9.96915 23.611 9.96944C23.6361 9.97338 23.6998 9.98339 23.8174 10.0088C23.9816 10.0442 24.2017 10.0983 24.4739 10.1706C25.017 10.3147 25.7408 10.524 26.5871 10.7815C28.2785 11.296 30.4389 11.9968 32.5822 12.7387C34.7276 13.4814 36.8437 14.2611 38.451 14.9334C39.257 15.2706 39.9181 15.5737 40.3861 15.826C40.6217 15.953 40.7892 16.057 40.8963 16.1362C40.9077 16.1446 40.9177 16.1523 40.9265 16.1592C40.9325 16.1975 40.9401 16.2529 40.9479 16.3293C40.9668 16.5158 40.9816 16.7678 40.9916 17.0824C41.0115 17.7099 41.0109 18.547 40.9931 19.5284C40.9576 21.4889 40.8541 23.9922 40.7161 26.4756C40.5782 28.959 40.4063 31.4139 40.2346 33.2774C40.1486 34.2108 40.0635 34.9865 39.9839 35.5402C39.9475 35.7934 39.9139 35.9882 39.8844 36.1257C39.7577 36.1905 39.5808 36.275 39.3554 36.3781C38.8912 36.5904 38.2504 36.8681 37.4865 37.1894C35.9605 37.8315 33.9636 38.6393 31.95 39.4315C29.9363 40.2237 27.9115 40.998 26.3291 41.5734C25.537 41.8614 24.862 42.0974 24.3572 42.2604C24.1039 42.3421 23.9016 42.4029 23.7527 42.4424C23.6787 42.462 23.6312 42.4726 23.6046 42.4782C23.5776 42.4726 23.5292 42.4621 23.4538 42.4425C23.3039 42.4035 23.1003 42.3435 22.8458 42.2629C22.3384 42.1022 21.66 41.8695 20.8643 41.5853C19.2748 41.0173 17.2413 40.252 15.2225 39.4661C13.2034 38.68 11.2055 37.8759 9.68666 37.2306C8.926 36.9074 8.29314 36.6273 7.84013 36.411C7.63152 36.3114 7.47013 36.2295 7.3555 36.1663C7.32654 36.0161 7.29342 35.8004 7.25716 35.5204C7.18386 34.9542 7.10324 34.1687 7.02017 33.2294C6.85424 31.3533 6.68104 28.8926 6.53827 26.4099C6.39549 23.927 6.28359 21.4297 6.23968 19.4796C6.21769 18.5034 6.21296 17.6726 6.2292 17.0525C6.23735 16.7415 6.25054 16.4936 6.26798 16.3116C6.27386 16.2501 6.27968 16.2032 6.28457 16.1686ZM7.20839 36.0772C7.20866 36.0773 7.21219 36.0797 7.21819 36.0846C7.21112 36.0796 7.20812 36.0772 7.20839 36.0772ZM7.39087 36.3228C7.39426 36.3316 7.39578 36.3367 7.39569 36.337C7.39559 36.3374 7.3939 36.333 7.39087 36.3228ZM39.8442 36.2835C39.8373 36.3029 39.8371 36.2979 39.8461 36.2778C39.8454 36.2802 39.8447 36.2821 39.8442 36.2835ZM40.043 36.039C40.0461 36.0368 40.048 36.0356 40.0483 36.0354C40.0486 36.0353 40.047 36.0364 40.043 36.039ZM23.0539 8.49824C23.2252 8.46079 23.4365 8.41907 23.6056 8.41907C23.7734 8.41907 23.9835 8.45994 24.155 8.49695C24.3536 8.53983 24.6005 8.60095 24.8843 8.67627C25.4532 8.82728 26.197 9.0426 27.0525 9.30284C28.7646 9.82372 30.9443 10.5308 33.105 11.2788C35.2636 12.026 37.4154 12.8182 39.0673 13.5092C39.891 13.8537 40.6074 14.1801 41.143 14.4689C41.4093 14.6124 41.6502 14.7569 41.8429 14.8995C41.9989 15.0149 42.2568 15.2219 42.3787 15.5186C42.4597 15.7158 42.4935 15.9702 42.5144 16.1758C42.5383 16.4119 42.5546 16.7029 42.5651 17.0342C42.5862 17.6984 42.5851 18.5642 42.5671 19.556C42.5311 21.5417 42.4266 24.0653 42.2881 26.56C42.1495 29.0547 41.9764 31.5292 41.8024 33.4171C41.7156 34.3594 41.6277 35.165 41.5427 35.7568C41.5004 36.0507 41.4569 36.3064 41.4115 36.5051C41.3891 36.6031 41.3624 36.7043 41.3296 36.7962L41.3282 36.8002C41.3081 36.8566 41.2408 37.0459 41.0813 37.1981C40.9949 37.2805 40.896 37.3408 40.8468 37.3701C40.7816 37.409 40.7066 37.4496 40.6274 37.4903C40.4682 37.5723 40.2615 37.6708 40.0194 37.7815C39.5334 38.0038 38.8755 38.2887 38.1059 38.6124C36.565 39.2607 34.5561 40.0734 32.5349 40.8685C30.5139 41.6636 28.4752 42.4433 26.8752 43.0251C26.0761 43.3157 25.3803 43.5592 24.8484 43.7309C24.5832 43.8165 24.3507 43.887 24.1625 43.9368C24.0092 43.9775 23.7902 44.032 23.6056 44.032C23.4232 44.032 23.2055 43.9789 23.0513 43.9388C22.8628 43.8898 22.6295 43.8205 22.3631 43.7362C21.8288 43.567 21.1297 43.3269 20.3267 43.04C18.7189 42.4656 16.6707 41.6947 14.6429 40.9052C12.6152 40.1158 10.6012 39.3053 9.06219 38.6515C8.2939 38.325 7.63631 38.0344 7.15226 37.8032C6.91155 37.6883 6.70287 37.5828 6.54117 37.4916C6.46102 37.4463 6.38109 37.3982 6.3102 37.349C6.26058 37.3145 6.13704 37.2277 6.0404 37.0964C5.93759 36.9567 5.89235 36.8005 5.87642 36.7455L5.8758 36.7433C5.85107 36.658 5.82969 36.562 5.8107 36.4645C5.77233 36.2675 5.7339 36.0125 5.69548 35.7158C5.61828 35.1195 5.53555 34.3104 5.45181 33.3635C5.28412 31.4674 5.10987 28.9904 4.9665 26.4973C4.82316 24.0045 4.71024 21.4881 4.66578 19.5139C4.64358 18.5279 4.63825 17.6689 4.65545 17.0126C4.66402 16.6854 4.67842 16.3983 4.70063 16.1665C4.71956 15.9688 4.75138 15.7116 4.83497 15.5127C4.90605 15.3436 5.01537 15.2183 5.09481 15.1387C5.18093 15.0523 5.27794 14.9747 5.3733 14.906C5.56389 14.7688 5.80279 14.6284 6.0675 14.4881C6.6002 14.2057 7.31437 13.8832 8.13696 13.5407C9.78673 12.8539 11.9381 12.0596 14.0976 11.3078C16.2591 10.5552 18.4403 9.84103 20.1538 9.31422C21.0099 9.05103 21.7544 8.833 22.3238 8.68002C22.6078 8.60371 22.855 8.54174 23.0539 8.49824Z" fill="#7BC6FF"/>
<path d="M35.4587 31.3123L33.7622 30.7005C33.5045 30.6018 33.483 30.1874 33.7407 30.069L35.3943 29.3388C35.5016 29.2994 35.5661 29.1415 35.5231 29.0034L35.3728 28.51C35.3298 28.3719 35.201 28.3127 35.0936 28.3521L33.44 29.0823C33.2038 29.181 32.9676 28.8455 33.1179 28.5889L34.0843 26.8128C34.1487 26.6944 34.1272 26.5366 34.0199 26.4576L33.6763 26.1616C33.5689 26.0827 33.44 26.1024 33.3756 26.2208L32.4092 27.9969C32.2589 28.2535 31.9368 28.135 31.9153 27.8193L31.8079 25.7077C31.8079 25.5696 31.7006 25.4512 31.5932 25.4512L31.1637 25.4709C31.0563 25.4709 30.9489 25.5893 30.9704 25.7472L31.3784 35.2591C31.3784 35.3973 31.4858 35.5157 31.5932 35.5157L32.0227 35.496C32.1301 35.496 32.2374 35.3775 32.216 35.2197L32.1301 33.0686C32.1086 32.7529 32.4522 32.6147 32.6025 32.8516L33.7192 34.5487C33.7836 34.6671 33.934 34.6868 34.0199 34.5882L34.342 34.2724C34.4279 34.1935 34.4494 34.0159 34.3635 33.8975L33.2468 32.2003C33.075 31.9438 33.2682 31.5886 33.5259 31.6872L35.2225 32.299C35.3298 32.3385 35.4587 32.2595 35.4802 32.1214L35.5875 31.628C35.652 31.5096 35.5875 31.3517 35.4587 31.3123Z" fill="#235174"/>
<path d="M23.2257 8.93697L5.56713 15.3863C5.56713 15.2708 2.15732 9.84181 2.32876 8.74446C2.48116 7.6471 16.2918 3.19992 17.8539 3.83524C19.3968 4.47055 22.8829 8.93697 23.2257 8.93697Z" fill="#FFD6E5"/>
<path d="M41.1649 15.3863L23.2258 8.90796C23.6322 8.90796 26.8833 4.01533 28.3347 3.78327C29.7861 3.55121 44.7643 7.49625 44.8998 8.40516C45.0352 9.31407 41.1649 15.1349 41.1649 15.3863Z" fill="#FFD6E5"/>
<path d="M47.2257 19.8575C47.2835 20.8029 31.2065 27.519 29.8186 26.9675C28.4306 26.416 23.4379 21.4134 23.2258 21.4134L41.0956 15.3867C41.0763 15.6428 47.1678 18.9122 47.2257 19.8575Z" fill="#FFD6E5"/>
<path d="M23.2258 21.4281C22.9419 21.4281 18.0394 27.1733 17.2823 26.9956C16.5251 26.8179 0.89031 19.9868 0.77674 19.2169C0.644241 18.4469 5.67919 15.5052 5.67919 15.3867L23.2258 21.4281Z" fill="#FFD6E5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.15161 9.017C3.20962 8.97863 3.28342 8.93331 3.37517 8.88132C3.73197 8.67916 4.25949 8.4322 4.92288 8.15619C6.24313 7.60687 8.01978 6.97599 9.8508 6.39568C11.6814 5.81552 13.5473 5.2919 15.0447 4.95373C15.7952 4.78424 16.4376 4.66489 16.9296 4.60654C17.1763 4.57729 17.3697 4.56527 17.5118 4.56683C17.618 4.56799 17.6658 4.57673 17.6744 4.57783C17.8957 4.67335 18.2567 4.92857 18.7344 5.35271C19.2037 5.76947 19.72 6.28898 20.2293 6.82547C20.6489 7.26742 21.0551 7.7116 21.4206 8.1114C21.4983 8.19633 21.5741 8.27925 21.6478 8.35973C21.738 8.45817 21.8266 8.55464 21.9124 8.64747L5.95749 14.4404C5.92503 14.3851 5.89078 14.3268 5.85498 14.2659C5.75925 14.103 5.65251 13.9213 5.53971 13.7281C5.20863 13.1609 4.80901 12.467 4.42773 11.7664C4.04476 11.0627 3.6882 10.3666 3.4388 9.79242C3.31367 9.50435 3.22275 9.26337 3.16834 9.07702C3.162 9.05532 3.15646 9.03534 3.15161 9.017ZM17.529 3.00023C17.744 3.00258 18.0098 3.02306 18.247 3.11893L18.2488 3.11968C18.7383 3.31895 19.2785 3.73981 19.7761 4.18168C20.2947 4.64221 20.8465 5.19902 21.367 5.74727C21.7977 6.20095 22.2157 6.65814 22.5814 7.05811C22.6582 7.14207 22.7327 7.2235 22.8044 7.30185C23.2345 7.77125 23.5405 8.09813 23.7033 8.24217L23.7637 8.29559L23.8119 8.36017C23.9726 8.57534 24.0403 8.8586 23.9756 9.13466C23.9096 9.41669 23.6976 9.68881 23.3617 9.78819L5.94929 16.1103L5.9399 16.1135C5.76688 16.1714 5.54302 16.1884 5.31693 16.0975C5.10935 16.0141 4.94607 15.8569 4.85288 15.6602C4.78934 15.5469 4.67631 15.3545 4.52524 15.0974C4.42696 14.9302 4.31257 14.7355 4.18524 14.5174C3.85112 13.9451 3.44244 13.2356 3.05016 12.5148C2.65955 11.797 2.27727 11.0536 2.00038 10.4162C1.86237 10.0984 1.74328 9.79057 1.66305 9.5158C1.5918 9.27178 1.51685 8.94533 1.56209 8.63857C1.59341 8.42264 1.69434 8.26158 1.76734 8.16554C1.84552 8.06267 1.93572 7.97715 2.01739 7.9087C2.18061 7.7719 2.38515 7.64119 2.60167 7.51851C3.04 7.27015 3.63511 6.99488 4.32008 6.70988C5.69654 6.13718 7.5195 5.49092 9.37669 4.90231C11.2344 4.31356 13.1452 3.7765 14.699 3.42558C15.4741 3.25053 16.1759 3.11823 16.7448 3.05076C17.0287 3.0171 17.2949 2.99766 17.529 3.00023Z" fill="#7BC6FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.3655 4.57545C28.3585 4.57724 28.3378 4.58311 28.3022 4.59897C28.2553 4.61986 28.1937 4.65303 28.1169 4.70278C27.9615 4.80343 27.7754 4.95143 27.5621 5.14596C27.1356 5.5351 26.6589 6.05659 26.1791 6.61645C25.8023 7.05622 25.4363 7.50445 25.0999 7.91654C25.0091 8.02772 24.9205 8.13627 24.8344 8.24131C24.7342 8.36356 24.6346 8.48454 24.5377 8.60072L40.7461 14.4331C40.8873 14.1931 41.0606 13.9072 41.2457 13.6029C41.3064 13.5031 41.3691 13.4 41.4336 13.2941C41.7702 12.7415 42.1534 12.1121 42.5258 11.4816C42.9708 10.7283 43.3909 9.98891 43.6907 9.39162C43.8215 9.13088 43.9232 8.90962 43.993 8.73351C43.9511 8.71305 43.9044 8.69104 43.8528 8.66751C43.4617 8.48949 42.8866 8.27166 42.1685 8.0273C40.7387 7.54076 38.8179 6.97446 36.8459 6.44103C34.8753 5.90798 32.8671 5.41143 31.2656 5.06337C30.4638 4.88912 29.7725 4.75395 29.2425 4.66984C28.9769 4.62769 28.7612 4.59986 28.5972 4.58576C28.4566 4.57365 28.3885 4.57502 28.3702 4.57539C28.3678 4.57544 28.3663 4.57547 28.3655 4.57545ZM44.0884 8.4374C44.0885 8.43736 44.0883 8.43898 44.0878 8.44242C44.0881 8.43917 44.0884 8.43745 44.0884 8.4374ZM45.4023 7.78686C45.478 7.8663 45.6266 8.04216 45.666 8.30571L45.6667 8.31048L45.6674 8.31527C45.6932 8.50324 45.6645 8.679 45.6379 8.79869C45.6087 8.93074 45.5649 9.06708 45.5159 9.19938C45.4177 9.46431 45.2769 9.77061 45.1153 10.0926C44.7906 10.7395 44.3482 11.5164 43.899 12.2769C43.5207 12.9173 43.1311 13.5572 42.7946 14.1097C42.7305 14.215 42.6683 14.3171 42.6085 14.4155C42.2197 15.0548 41.9608 15.488 41.8854 15.6456L41.861 15.6966L41.8294 15.7437C41.6983 15.9394 41.5134 16.0562 41.3415 16.1132C41.207 16.1579 40.9707 16.2001 40.7188 16.0992L23.0072 9.72601L22.9655 9.70527C22.4618 9.45459 22.2354 8.73485 22.7199 8.25258L22.7339 8.23862L22.7487 8.22538C22.8975 8.09137 23.1829 7.75649 23.5993 7.24857C23.6815 7.14825 23.7674 7.04296 23.8565 6.93392C24.194 6.52041 24.5757 6.05289 24.9661 5.59729C25.4583 5.02298 25.985 4.44295 26.4842 3.9875C26.7338 3.75975 26.9911 3.54969 27.246 3.38456C27.4908 3.226 27.7886 3.07222 28.1128 3.02002L28.1142 3.0198C28.3094 2.98872 28.5378 2.99948 28.7349 3.01645C28.9516 3.03509 29.2087 3.06914 29.4942 3.11446C30.0666 3.2053 30.7909 3.34747 31.6067 3.52477C33.2404 3.87983 35.2753 4.38323 37.2651 4.92148C39.2535 5.45934 41.2105 6.03567 42.6855 6.5376C43.4198 6.78747 44.0538 7.02533 44.5172 7.23627C44.7455 7.34019 44.9599 7.44984 45.1306 7.56379C45.2149 7.62009 45.3139 7.69399 45.4023 7.78686Z" fill="#7BC6FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M40.8813 16.2898C40.9404 16.3299 41.0005 16.3694 41.0587 16.4071C41.2698 16.5441 41.5372 16.71 41.8348 16.8927C41.9752 16.9789 42.1229 17.0692 42.276 17.1628C42.7787 17.4701 43.3403 17.8135 43.8951 18.1654C44.6213 18.626 45.3109 19.0856 45.8167 19.4783C45.9419 19.5756 46.0505 19.6646 46.1423 19.7447C46.1338 19.75 46.1253 19.7553 46.1166 19.7607C45.7111 20.0128 45.1073 20.3366 44.3518 20.7091C42.847 21.4511 40.8096 22.3529 38.7193 23.2113C36.6291 24.0697 34.5016 24.8783 32.817 25.4365C31.9727 25.7162 31.2548 25.928 30.715 26.0525C30.4437 26.115 30.2355 26.1513 30.088 26.1657C30.0324 26.1712 29.9953 26.1724 29.9733 26.1726C29.7696 26.0761 29.3797 25.8116 28.8273 25.3711C28.2575 24.9167 27.5953 24.3417 26.9326 23.749C26.3796 23.2543 25.8161 22.7376 25.3132 22.2764C25.0923 22.0738 24.883 21.8819 24.6915 21.7074L40.8813 16.2898ZM30.0263 26.1955L30.0236 26.1945C30.0245 26.1948 30.0254 26.1952 30.0263 26.1955ZM46.4624 20.0722C46.4653 20.077 46.4645 20.0765 46.4616 20.071C46.4619 20.0714 46.4621 20.0718 46.4624 20.0722ZM41.4304 14.725L41.4308 14.7253L41.5318 14.7766L41.6129 14.8529C41.6124 14.8524 41.6121 14.8521 41.6121 14.8521C41.6123 14.852 41.6318 14.8684 41.6845 14.9059C41.7413 14.9462 41.8176 14.9975 41.9141 15.0601C42.1069 15.1852 42.3594 15.342 42.6567 15.5245C42.7924 15.6079 42.9369 15.6962 43.088 15.7886C43.5923 16.0969 44.1696 16.4498 44.7366 16.8094C45.4711 17.2752 46.2131 17.7678 46.7811 18.2088C47.063 18.4277 47.3247 18.6512 47.5253 18.8661C47.6255 18.9735 47.7267 19.0959 47.8086 19.2297C47.8849 19.3542 47.9826 19.5496 47.9982 19.7922L47.9983 19.7944C48.0173 20.103 47.8734 20.3275 47.8085 20.4181C47.7291 20.5291 47.6347 20.6207 47.5546 20.6907C47.3913 20.8335 47.178 20.98 46.946 21.1242C46.4748 21.4172 45.8167 21.7677 45.0459 22.1478C43.4982 22.9109 41.4256 23.8276 39.3152 24.6943C37.2048 25.561 35.041 26.3841 33.3102 26.9575C32.4469 27.2436 31.6761 27.4726 31.0672 27.6131C30.764 27.683 30.4828 27.7352 30.2409 27.759C30.039 27.7788 29.7285 27.7958 29.4521 27.6873C29.0088 27.5138 28.4193 27.0846 27.8466 26.6278C27.2417 26.1454 26.5533 25.547 25.8835 24.9479C25.2681 24.3975 24.6788 23.8565 24.1737 23.3928C23.5567 22.8264 23.0654 22.3754 22.8059 22.1636C22.1825 21.6737 22.4592 20.8115 23.039 20.5759L23.062 20.5665L40.6833 14.67C40.8873 14.5907 41.0783 14.6061 41.2102 14.6396C41.3262 14.6691 41.4235 14.7213 41.4304 14.725Z" fill="#7BC6FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.84921 16.2881L21.8456 21.7568C21.7068 21.9008 21.5598 22.0547 21.4079 22.2141C21.3117 22.315 21.2127 22.419 21.1115 22.5254C20.6478 23.0126 20.1368 23.5496 19.6309 24.066C19.0123 24.6975 18.4179 25.2812 17.9428 25.6936C17.7103 25.8954 17.5258 26.039 17.3929 26.1256C17.3781 26.1201 17.3622 26.114 17.3451 26.1075C17.1957 26.0506 16.9936 25.9703 16.7444 25.8689C16.2468 25.6663 15.5738 25.3843 14.7842 25.0471C13.2054 24.3731 11.1692 23.4825 9.15318 22.5734C7.13557 21.6636 5.14576 20.7388 3.65676 19.9956C2.91014 19.6229 2.30224 19.3023 1.88295 19.0557C1.87643 19.0518 1.86997 19.048 1.86358 19.0442C1.88461 19.0257 1.90656 19.0066 1.92945 18.987C2.31217 18.659 2.85416 18.2652 3.43782 17.8663C4.01692 17.4705 4.61623 17.0835 5.10608 16.7687C5.156 16.7366 5.2055 16.7048 5.25427 16.6735C5.47691 16.5306 5.68453 16.3973 5.84921 16.2881ZM6.06125 14.6703C5.86027 14.5907 5.67209 14.606 5.54219 14.6396C5.42797 14.6692 5.33229 14.7215 5.32545 14.7253C5.32523 14.7254 5.3251 14.7255 5.32507 14.7255L5.25991 14.7592L5.20196 14.8048C5.12411 14.866 4.82143 15.0605 4.33166 15.3753L4.2808 15.4079C3.79062 15.723 3.17487 16.1204 2.5758 16.5299C1.98128 16.9363 1.382 17.3688 0.93226 17.7543C0.710393 17.9445 0.498068 18.1458 0.338726 18.3442C0.259409 18.443 0.173155 18.5656 0.108252 18.7065C0.0474948 18.8384 -0.0302794 19.0633 0.0121134 19.3328C0.0563788 19.6165 0.227462 19.7994 0.274519 19.8497L0.275491 19.8508C0.352272 19.9329 0.439231 20.0045 0.516416 20.063C0.674073 20.1825 0.879592 20.3131 1.10981 20.4485C1.57549 20.7224 2.22104 21.0618 2.97689 21.439C4.49282 22.1957 6.50404 23.1302 8.52792 24.0428C10.5534 24.9561 12.5991 25.8509 14.1872 26.5289C14.9809 26.8678 15.6626 27.1535 16.1713 27.3606C16.4252 27.464 16.6393 27.5491 16.804 27.6119C16.9465 27.6662 17.1051 27.7248 17.2134 27.75L17.2154 27.7505C17.4796 27.8112 17.7092 27.7381 17.8247 27.6938C17.9608 27.6416 18.0902 27.5684 18.2033 27.496C18.4314 27.3499 18.6869 27.146 18.9473 26.9199C19.473 26.4636 20.1044 25.8418 20.7282 25.205C21.2429 24.6797 21.7636 24.1325 22.2274 23.6451C22.3279 23.5395 22.4257 23.4368 22.5202 23.3376C23.0566 22.7749 23.4628 22.3546 23.6734 22.1654C23.9262 21.9512 24.0441 21.6157 23.985 21.2893C23.9249 20.9578 23.688 20.6788 23.3561 20.5829L6.06125 14.6703Z" fill="#7BC6FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.3042 21.7384C23.8191 29.2573 24.5074 39.0586 24.9138 43.0203L23.0861 43.2077C22.6759 39.208 21.976 29.2893 22.4708 21.6201L24.3042 21.7384Z" fill="#7BC6FF"/>
</svg>


`;
  return <SvgXml xml={xml} />;
}
export default Box;