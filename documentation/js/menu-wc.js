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
                                            'data-bs-target="#controllers-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' : 'data-bs-target="#xs-controllers-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' :
                                            'id="xs-controllers-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' : 'data-bs-target="#xs-injectables-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' :
                                        'id="xs-injectables-links-module-AppModule-614eef5b8e364a4c99ede4f27dd9567de24a84bfc3d2444b19c7118c65a839e706eff740e99390e547809623a79d923fb4aa5c09ab6577e2061b149ec8bf07f3"' }>
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
                                            'data-bs-target="#controllers-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' :
                                            'id="xs-controllers-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' :
                                        'id="xs-injectables-links-module-PostsModule-91443a31ef74eaa87169391027a9722ab7d9268632d5d18ea17a1eec517be476d0040ccefa8208fc0c58f9dccf6e88e26eff8887a014a8f491244fb816d6c97f"' }>
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
                                            'data-bs-target="#controllers-links-module-TagsModule-424b8c991d923b758fd7383fe79dd7195cfb32cc3b8003999e94ecdfd4e25de969d2b26bda9d87bfaead3642bcd0dd124ef8701a32760d63f101c25be559b04d"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-424b8c991d923b758fd7383fe79dd7195cfb32cc3b8003999e94ecdfd4e25de969d2b26bda9d87bfaead3642bcd0dd124ef8701a32760d63f101c25be559b04d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-424b8c991d923b758fd7383fe79dd7195cfb32cc3b8003999e94ecdfd4e25de969d2b26bda9d87bfaead3642bcd0dd124ef8701a32760d63f101c25be559b04d"' :
                                            'id="xs-controllers-links-module-TagsModule-424b8c991d923b758fd7383fe79dd7195cfb32cc3b8003999e94ecdfd4e25de969d2b26bda9d87bfaead3642bcd0dd124ef8701a32760d63f101c25be559b04d"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' :
                                            'id="xs-controllers-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' :
                                        'id="xs-injectables-links-module-UsersModule-558b69b9a4cfb778f173fe41438c07ac6ae5205a8a75c2414d5065cd3101fe4f9bfced337d839a0cc578b0524fbacacc3bfa48e10de76a714edf735ade2e82c3"' }>
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
                                <a href="classes/CreatePostDto-1.html" data-type="entity-link" >CreatePostDto</a>
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