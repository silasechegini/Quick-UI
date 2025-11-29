## Version History Summary

This changelog covers the development and evolution of the Quick-UI React component library from November 16-28, 2025. The project has undergone several iterations to establish proper build tooling, CSS handling, type safety, testing infrastructure, and component features:

- [1.0.1] - 2025-11-16: Initial release with basic functionality
- [1.0.2] - 2025-11-17, [1.0.3] - 2025-11-17: Build system improvements and CSS compilation fixes
- [1.0.4] - 2025-11-17: Major enhancement focusing on type safety and Storybook configuration
- [1.0.5] - 2025-11-18: Final polish with conflict resolution and cleanup
- [1.0.7] - 2025-11-19: Documentation improvements and component README cleanup
- [1.0.8] - 2025-11-27: Package metadata and keyword optimization
- [1.0.9] - 2025-11-28: New StarRating component and UI enhancements

### Key Improvements Across Versions

1. **Build System Evolution**: Migrated from tsup to vite for better CSS handling and bundling
2. **Type Safety Enhancement**: Systematic replacement of string literals with TypeScript enums across all components
3. **Developer Experience**: Improved Storybook configuration with proper TypeScript path resolution
4. **Documentation**: Comprehensive README updates with accurate installation and usage instructions
5. **Code Quality**: Enhanced component typing patterns and consistent enum usage
6. **Component Library Growth**: Added new interactive components like StarRating with full accessibility support
7. **Icon System**: Expanded icon library with new icons for better UX

### Components Enhanced

- Accordion, Avatar, Badge, Button, Card, Chip, ComboBox, Flyout, Footer, Header, Icon, Input, Modal, MultiSelect, Page, ProgressBar, Radio, Slider, StarRating, Switch, Toggle

### Technical Infrastructure

- **Build**: Vite-based build system with proper CSS extraction
- **Testing**: Vitest testing framework with @testing-library integration
- **Documentation**: Storybook with TypeScript support and path mapping
- **Type Safety**: Comprehensive enum-based typing system
- **Styling**: SCSS-based styling with proper bundling and export configuration
- **Accessibility**: WCAG-compliant components with keyboard navigation and ARIA support

---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2025-11-28

### Added

- New StarRating component with full accessibility support
  - Supports full and half-star ratings
  - Keyboard navigation with arrow keys
  - Custom icons support
  - Controlled and uncontrolled modes
  - Custom value formatters
  - Hover effects and visual feedback
- New copy icon (COPY_ICON) to icon library
- Enhanced Button component with CIRCULAR shape option

### Changed

- Updated IntroPage to use copy icon instead of download icon for copy-to-clipboard action
- Improved Storybook navigation in documentation pages

### Fixed

- Fixed TypeScript path resolution issues in .storybook/tsconfig.json
- Resolved custom icon half-rating visual inconsistency by disabling half icons when custom icons are used

## [1.0.8] - 2025-11-27

### Changed

- Updated package keywords for better discoverability

## [1.0.7] - 2025-11-19

### Changed

- Improved README.md for enhanced clarity and style
- Cleaned up component documentation by removing redundant README files

### Removed

- Deleted individual README files from Accordion, Badge, Modal, and ProgressBar components

### Fixed

- Fixed duplicate feature entries in Accordion README
- Fixed formatting issues in CONTRIBUTING.md

## [1.0.5] - 2025-11-18

### Fixed

- Fixed conflicting typing in Accordion component
- Resolved type conflicts in Accordion.types.ts

### Removed

- Removed unnecessary zip file (quick-ui-react-1.0.1.tgz) from repository

## [1.0.4] - 2025-11-17

### Changed

- **Component Typing**: Made component typing more robust by introducing enums for component props instead of string literals across multiple components ([#57](https://github.com/silasechegini/Quick-UI/pull/57))
  - Introduced enums with uppercase snake case naming (e.g., `INPUT_VARIANTS`, `TOGGLE_SIZES`)
  - Replaced string literal types with enum-derived type aliases
  - Updated component implementations to use enum values
  - Reorganized type definition files for better structure

- **Storybook Configuration**: Enhanced component configurations by replacing string literal values with enum constants ([#56](https://github.com/silasechegini/Quick-UI/pull/56))
  - Replaced string literals with enum constants (`BADGE_VARIANTS`, `BADGE_SIZES`, `BADGE_POSITIONS`, `BADGE_TYPES`, `AVATAR_VARIANTS`, `AVATAR_SIZES`, `AVATAR_SHAPES`, `BUTTON_VARIANTS`) across story files
  - Added TypeScript configuration for Storybook with proper path resolution
  - Enhanced main.ts with vite-tsconfig-paths plugin

- Updated README.md with corrected information
- Removed success stories section from README ([#55](https://github.com/silasechegini/Quick-UI/pull/55))
- Updated stories for Button, Chip, Flyout, Header, Input, Page, Slider, and Toggle components with proper enum usage
- Improved type safety across DebouncedInput stories

## [1.0.3] - 2025-11-16

### Fixed

- **Build System Migration**: Complete migration from tsup to vite for better CSS handling ([#54](https://github.com/silasechegini/Quick-UI/pull/54))
  - Fixed compilation issue where styles were not being applied to components
  - Added proper CSS export configuration in package.json
  - Updated documentation to include CSS import instructions
  - Removed redundant SCSS @import statements from component files
  - Added TypeScript declarations for CSS imports

### Changed

- Updated README.md with comprehensive setup instructions
- Added CSS import examples for consumers
- Updated bundle size information
- Improved Storybook rendering configuration
- Fixed import strategy for component styles
- Added configurations to apply styles in consumer packages

## [1.0.2] - 2025-11-16

### Changed

- Updated build configuration for better CSS bundling
- Enhanced Storybook main.ts configuration
- Updated package dependencies

### Fixed

- Fixed tsup configuration issues
- Improved CSS publishing pipeline

## [1.0.1] - 2025-11-16

### Added

- Initial stable release
- Added SCSS to CSS bundling support
- Added CSS publishing configuration
- Initial tsup configuration for building
- Basic Storybook setup
- Package configuration for npm publishing

---

[1.0.9]: https://github.com/silasechegini/Quick-UI/compare/QUI_RC_5...QUI_RC_6
[1.0.8]: https://github.com/silasechegini/Quick-UI/compare/QUI_RC_4...QUI_RC_5
[1.0.7]: https://github.com/silasechegini/Quick-UI/releases/tag/QUI_RC_4
[1.0.5]: https://github.com/silasechegini/Quick-UI/compare/QUI_RC_3...QUI_RC_4
[1.0.4]: https://github.com/silasechegini/Quick-UI/compare/QUI_RC_2...QUI_RC_3
[1.0.3]: https://github.com/silasechegini/Quick-UI/releases/tag/QUI_RC_2
[1.0.2]: https://github.com/silasechegini/Quick-UI/compare/QUI_RC_1...QUI_RC_2
[1.0.1]: https://github.com/silasechegini/Quick-UI/releases/tag/QUI_RC_1
