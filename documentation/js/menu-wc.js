'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bootstrap documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' :
                                            'id="xs-controllers-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' :
                                        'id="xs-injectables-links-module-AppModule-c4567dc68afce282c22778670ecbdf6d1e4140d0f9c6ba950f23ce62b8308d7d4a839eb9e9ded3c17b1a28ffcb147d7a93b6a6d5d1d7a2c26b68a01928f15530"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' :
                                            'id="xs-controllers-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' :
                                        'id="xs-injectables-links-module-AuthModule-8d0626afd79c05ce785ef8114e24ca32bcbb23803225659b73b87ad9d072872d8a7d55258fb973be479dc817da75e4b7d28a36e982b63128e8e89c1df7989680"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-4b81a306852a940a876e7f3e31e72d18a6063d51a5e35f29c1310ec14f7946931dfbcf8869d1d7614829bd78c7e7eb7b730e7dfaa5a3772ab860dc620a46a0cc"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' :
                                            'id="xs-controllers-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' :
                                        'id="xs-injectables-links-module-PostsModule-d350310ba413e2cd00b89b31f3d738079a390f23b410eb6f137030f5a8a8206cf650a721132d563a6881bf1f0cd797cc9b8d662935f6976f3f74650c5cbc6df9"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' :
                                            'id="xs-controllers-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' :
                                        'id="xs-injectables-links-module-TagsModule-174c6ee2696b4f957bc66010341ebb7f4dd1d4171a470bc7764938a87dec9c0cfc2fc1fa8fbc98d132d9efa87d38340d574c6c2f66b994a751a067f4de687843"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' :
                                            'id="xs-controllers-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' :
                                        'id="xs-injectables-links-module-UsersModule-1ed09c28c251b420ce385ab29a34b351cbb8b983f4cf0a022465f250ff3ac70ae9efc28476a46745234e777b0a8c075fc67d347e48fb24f7125164695279649a"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});